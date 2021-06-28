import _DATA from "~/data/charts/data";
import each from "lodash/each";
import axios, { AxiosResponse } from "axios";
import moment from "moment";
import Provider, { GraphStatus } from "./../services/provider";

const _LIST = [
	"interaction",
	"language",
	"interest",
	"timespent",
	"hourly",
	"daily",
	"collected",
	"aborted",
	"average",
	"emails"
];

const _PATH = "/api/chart";

const _PERIOD_MODEL = Provider.getChild("period");

interface IData {
	[key: string]: (string | number)[][];
}

export class GraphLoad {
	private static data: IData = _DATA as IData;

	public static getData(name: string): (string | number)[][] {
		return this.data[name];
	}

	public static loadAll(): void {
		each(_LIST, GraphLoad.load.bind(GraphLoad));
	}

	public static load(name: string): void {
		const p = Provider.getChild(["graphs", name]);
		p.set(GraphStatus.LOADING);
		const period = _PERIOD_MODEL.get();
		const path = `${_PATH}/${name}/${period.year}/${moment()
			.month(period.month)
			.format("MM")}`;
		axios(path)
			.then((res: AxiosResponse) => {
				const { data } = res;
				GraphLoad.data[name] = data;
				p.set(GraphStatus.READY);
				console.log("status", p.get());
			})
			.catch((err: Error) => {
				if (err.message.endsWith(`status code 302`)) {
					p.set(GraphStatus.INPROCESS);
					console.log("status", p.get());
				}
				else p.set(GraphStatus.ERROR);
			});
	}
}

_PERIOD_MODEL.subscribe(GraphLoad.loadAll);
