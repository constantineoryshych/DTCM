import Provider from "../services/provider";
import { IKioskState } from "~/data/const";
import Data from "./data";

const _KIOSK_MODEL = Provider.getChild("kiosk");
const state: IKioskState = _KIOSK_MODEL.get();

const WAIT_MODEL = Provider.getChild(["view", "wait"]);

export class StateController {
	private lang: any = state.lang;
	private stepType: any = state.stepType;

	constructor() {
		_KIOSK_MODEL.subscribe(this.update.bind(this));
	}

	private update(kioskState: IKioskState): void {
		WAIT_MODEL.set(true);
		const action: Promise<void | never>[] = this.isChanged();

		document.body.className = `${kioskState.lang} step${kioskState.step}`;

		if (action.length < 1) return WAIT_MODEL.set(false);

		const { lang, stepType, step } = kioskState;

		this.lang = lang;
		this.stepType = stepType;

		Promise.all(action)
			.then(
				(): void => {
					WAIT_MODEL.set(false);
				}
			)
			.catch(console.warn);
	}

	private isChanged(): Promise<void | never>[] {
		const { lang, stepType } = _KIOSK_MODEL.get();
		const action: Promise<void | never>[] = [];

		if (lang !== this.lang) action.push(Data.getLang(lang));
		if (stepType !== this.stepType)
			action.push(Data.getGrid(stepType));

		return action;
	}
}
