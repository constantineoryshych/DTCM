import moment from "moment";
import { IGraphSchema } from "~/@/model";
import Graph from "~/server/models/chart.model";
import Logger from "~/server/services/logger";
import Model from "./model";

export class ChartController {
	private static readonly inProcess: Map<string, Set<string>> = new Map<string, Set<string>>();
	private readonly type: string;
	private readonly period: string;
	private readonly periodEnded: boolean;
	private after: number;
	private before: number;

	constructor(type: string, year: string, month: string) {
		this.type = type;
		this.period = `${year}-${month}`;

		const now = moment(moment.now());
		if (Number(now.format("YYYY")) > Number(year)) this.periodEnded = true;
		else if (Number(now.format("YYYY")) === Number(year))
			if (Number(now.format("M")) > Number(month)) this.periodEnded = true;
			else this.periodEnded = false;
		else this.periodEnded = false;
	}

	public static get(type: string, year: string, month: string): Promise<{}> {
		const chart = new ChartController(type, year, month);

		return new Promise(
			(resolve: (data: (string | number | { role: string })[][]) => void, reject: (err: Error) => void): void => {
				chart
					.get()
					.then(resolve)
					.catch(
						(err: Error): void => {
							console.log(err.message);
							reject(new Error(`inProgress`));
							const inProcess = ChartController.inProcess.get(chart.period);
							if (inProcess && inProcess.has(type)) return;
							chart
								.collect()
								.then(resolve)
								.catch(reject);
						}
					);
			}
		);
	}

	protected async get(): Promise<(string | number | { role: string })[][] | never> {
		const result: IGraphSchema | null = await Graph.findOne({ type: this.type, period: this.period });
		if (!result) throw new Error(`Graph '${this.type}' for period '${this.period}' not exist`);
		if (!result.periodEnded && Math.abs(moment(result.collected).diff(moment(moment.now()), "days")) >= 1)
			this.update().catch(
				(err: Error): void => {
					Logger.error(`Update Graph '${this.type}' for period '${this.period}' error: ${err.message}`);
				}
			);
		return result.data;
	}

	private async collect(): Promise<(string | number | { role: string })[][] | never> {
		const date = this.period + "-01";
		this.after = moment(date)
			.subtract(1, "seconds")
			.unix();

		this.before = moment(date)
			.add(1, "month")
			.unix();

		let inProcess = ChartController.inProcess.get(this.period);
		if (inProcess) inProcess.add(this.type);
		else ChartController.inProcess.set(this.period, new Set<string>(this.type));

		const result: (string | number | { role: string })[][] | null = await Model[this.type](this.before, this.after);
		if (!result) throw new Error(`Graph '${this.type}' for period '${this.period}' not exist`);
		Graph.create({ type: this.type, period: this.period, periodEnded: this.periodEnded, data: result }).catch(
			(err: Error): void => {
				Logger.error(`Saving Graph '${this.type}' for period '${this.period}' error: ${err.message}`);
			}
		);

		inProcess = ChartController.inProcess.get(this.period);
		if (inProcess) {
			inProcess.delete(this.type);
			if (inProcess.size < 1) ChartController.inProcess.delete(this.period);
		}

		return result;
	}

	private async update(): Promise<(string | number | { role: string })[][] | never> {
		const date = this.period + "-01";
		this.after = moment(date)
			.subtract(1, "seconds")
			.unix();

		this.before = moment(date)
			.add(1, "month")
			.unix();

		let inProcess = ChartController.inProcess.get(this.period);
		if (inProcess) inProcess.add(this.type);
		else ChartController.inProcess.set(this.period, new Set<string>(this.type));

		const result: (string | number | { role: string })[][] | null = await Model[this.type](this.before, this.after);
		if (!result) throw new Error(`Graph '${this.type}' for period '${this.period}' not exist`);
		const collected = moment.now();
		Graph.updateOne(
			{ type: this.type, period: this.period },
			{ periodEnded: this.periodEnded, data: result, collected }
		).catch(
			(err: Error): void => {
				Logger.error(`Saving Graph '${this.type}' for period '${this.period}' error: ${err.message}`);
			}
		);

		inProcess = ChartController.inProcess.get(this.period);
		if (inProcess) {
			inProcess.delete(this.type);
			if (inProcess.size < 1) ChartController.inProcess.delete(this.period);
		}

		return result;
	}
}
