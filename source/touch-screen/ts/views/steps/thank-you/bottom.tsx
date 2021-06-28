import { Component, createElement } from "react";
import { Events } from "../../../controllers/events";
import { ButtonView } from "../../common/buttonView";

export class BottomComposition extends Component {
	getButton() {
		const param = { type: "done", onClick: Events.toWelcome.bind(Events) };
		return createElement(ButtonView, param);
	}

	render() {
		const className = `thank-you-bottom`;
		return createElement("div", { className }, this.getButton());
	}
}