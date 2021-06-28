import moment from "moment";
import mCustomerSession from "../models/customerSession.model";
import mCustomerActivity from "../models/customerActivity.model";
import { AKioskStateClass, ACustomerSession } from "~/@/kiosk";
import { IKioskState } from "~/@/const";
import { ICustomerSessionSchema } from "../../../@types/model";
import Logger from "./../services/logger";

export class CustomerSession implements ACustomerSession {
	private readonly kiosk: AKioskStateClass;
	private sessionModel: ICustomerSessionSchema | null = null;

	constructor(kiosk: AKioskStateClass) {
		this.kiosk = kiosk;

		this.kiosk.on("update", this.updateHandler.bind(this));
	}

	private async updateHandler(state: IKioskState): Promise<void> {
		const { step } = state;
		switch (step) {
			case 0: {
				await this.end();
				break;
			}
			case 1: {
				if (!state.email) await this.end("abort");
				else await this.end("success");
				break;
			}
			case 2: {
				await this.start();
				break;
			}
			case 5: {
				await this.auth();
				break;
			}
			default:
				break;
		}

		await this.stepView();
	}

	private async start(): Promise<void> {
		if (this.sessionModel !== null) return;
		const kiosk = this.kiosk.state.id;
		const { lang } = this.kiosk.state;
		const dateStart = moment().format("X");
		try {
			this.sessionModel = await mCustomerSession.create({ kiosk, lang, dateStart });
		} catch (err) {
			Logger.error(err.message);
		}
	}

	private async stepView(): Promise<void> {
		if (this.sessionModel === null) return;
		const { stepType, step } = this.kiosk.state;
		try {
			await mCustomerActivity.create({
				session: this.sessionModel._id,
				timestamp: moment().format("X"),
				event: "step",
				primary: step,
				secondary: stepType
			});
		} catch (err) {
			Logger.error(err.message);
		}
	}

	private async auth(): Promise<void> {
		if (this.sessionModel === null) return;
		const { email } = this.kiosk.state;
		try {
			await this.sessionModel.update({ email });
			await mCustomerActivity.create({
				session: this.sessionModel._id,
				timestamp: moment().format("X"),
				event: "subscribe"
			});
		} catch (err) {
			Logger.error(err.message);
		}
	}

	private async end(status: string = "timer"): Promise<void> {
		if (this.sessionModel === null) return;
		const dateEnd = moment().format("X");
		try {
			await this.sessionModel.update({ dateEnd, status });
		} catch (err) {
			Logger.error(err.message);
		}

		this.sessionModel = null;
	}
}
