import Provider from "./../services/provider";
import { Events } from "./events";

const _INPUT_MODEL = Provider.getChild(["form", "input"]);
const _READY_MODEL = Provider.getChild(["form", "ready"]);
const _CHECK_MODEL = Provider.getChild(["form", "checkbox"]);

export class FormController {
	public static reset(): void {
		_INPUT_MODEL.set("");
		_READY_MODEL.set(false);
		_CHECK_MODEL.set({
			personal: false,
			terms: false
		});
	}

	public static send(): void {
		Events.sendForm();
	}

	public static isReady(): void {
		const { personal, terms } = _CHECK_MODEL.get();
		_READY_MODEL.set(personal && terms && FormController.emailValidation());
	}

	public static emailValidation(): boolean {
		const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(_INPUT_MODEL.get());
	}
}

_CHECK_MODEL.subscribe(FormController.isReady);
_INPUT_MODEL.subscribe(FormController.isReady);
