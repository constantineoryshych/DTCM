import { StepType } from "~/@/const";
import ws from "./ws";
import Provider from "../services/provider";
import { Session } from "./session";

const _STEP_MODEL = Provider.getChild(["kiosk", "step"]);
const _INPUT_MODEL = Provider.getChild(["form", "input"]);

export class Events {
	public static init(): void {
		document.addEventListener("contextmenu", (event: PointerEvent) => {
			event.preventDefault();
			return false;
		});
	}

	public static back(): void {
		const step = _STEP_MODEL.get() - 1;
		ws.send({ title: "clientEvent", data: { step } });
	}

	public static langChange(lang: string): void {
		ws.send({ title: "clientEvent", data: { lang, step: 2 } });
	}

	public static expView(stepType: StepType): void {
		ws.send({ title: "clientEvent", data: { step: 3, stepType } });
	}

	public static exploreMore(): void {
		ws.send({ title: "clientEvent", data: { step: 2 } });
	}

	public static registerNow(): void {
		ws.send({ title: "clientEvent", data: { step: 4 } });
	}

	public static sendForm(): void {
		ws.send({ title: "clientEvent", data: { step: 5, email: _INPUT_MODEL.get() } });
	}

	public static toWelcome(): void {
		ws.send({ title: "clientEvent", data: { step: 1 } });
	}
}

Events.init();
