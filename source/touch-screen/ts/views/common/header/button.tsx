import { Component, createElement } from "react";
import map from "lodash/map";
import Provider from "../../../services/provider";
import { ButtonView } from "../buttonView";

const STEPS = {
	2: [{ key: 1, type: "back" }],
	3: [{ key: 1, type: "exploreMore" }, { key: 2, type: "registerNow" }],
	// 3: [{ key: 1, type: "exploreMore" }],
	4: [{ key: 1, type: "exploreMore" }, { key: 2, type: "back" }],
	5: []
};

const _STEP_MODEL = Provider.getChild(["kiosk", "step"]);

export class ButtonComposition extends Component {
	public render(): JSX.Element {
		const className = "button-wrap";
		return createElement("div", { className }, this.getButtons());
	}

	private getButtons(): JSX.Element[] {
		const step = _STEP_MODEL.get();
		return map(STEPS[step], this.getButton.bind(this));
	}

	private getButton(button: any): JSX.Element {
		return createElement(ButtonView, button);
	}
}
