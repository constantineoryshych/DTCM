import Sender from "~/server/services/sender";
import Logger from "~/server/services/logger";
import Tours from "~/data/tours";

import { IKioskState, Locale, StepType } from "~/@/const";
import { AKioskStateClass } from "~/@/kiosk.d";

import TemplateConstructor from "~/server/services/templateConstructor";

class SenderController {
	private first: StepType | null | string = null;
	private second: StepType | null | string = null;
	private kiosk: AKioskStateClass;

	constructor(kiosk: AKioskStateClass) {
		this.kiosk = kiosk;

		this.kiosk.on("update", (state: IKioskState) => {
			this.parse(state);
			if (state.step > 1) return;
			this.first = null;
			this.second = null;
		});
	}

	public static async __TEST_TEMPLATE(lang: string, exp1: string, exp2: string): Promise<string> {
		const tours: [string, string] = [Tours.split.first[exp1], Tours.split.second[exp2]];
		return TemplateConstructor.get(lang, tours);
	}

	public async send(state: IKioskState, tourKey: [string, string]): Promise<void> {
		const { email, lang } = state;
		if (email === null) throw new Error(`Email is null`);

		const template = TemplateConstructor.get(lang === "ar" ? "ar" : "en", tourKey);

		try {
			await Sender.send(email, template);
		} catch (err) {
			Logger.error(`Sender: Email sending for: '${email}', '${lang}', '${tourKey}'; ${err}`);
		}
	}

	private parse(state: IKioskState): void {
		const { step, stepType } = state;
		
		if (step === 3 && stepType !== null && !(stepType as string).startsWith("pcg")) {
			if (this.first === null) this.first = stepType;
			else if (this.second === null) this.second = stepType;
		} else if (step === 5) this.tourData(state);
	}

	private tourData(state: IKioskState): void {
		let data: [string, string] = ["", ""];
		if (this.second !== null && this.first !== null)
			data = [Tours.split.first[this.first.toString()], Tours.split.second[this.second.toString()]];
		else if (this.first !== null)
			data = Tours.single[this.first.toString()];

		try {
			this.send(state, data);
		} catch (err) {
			Logger.error(``);
		}
	}
}

export default SenderController;
