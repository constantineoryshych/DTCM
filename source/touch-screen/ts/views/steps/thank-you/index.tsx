import { Component, createElement } from "react";
import map from "lodash/map";
import split from "lodash/split";
import Data from "./../../../controllers/data";
import { BottomComposition } from "./bottom";

const PATH = `/public/content-library/gui/touch-screen/bg/`;

export class ThankYouComposition extends Component {
	getBg() {
		const src = PATH + Data.theme.steps["5"].bg;
		const img = createElement("img", { src });
		const className = `bg`;

		return createElement("div", { className, key: "bg" }, img);
	}

	getMessage() {
		const { thankYouPage } = Data.lang.label;
		const message = split(thankYouPage, `\\r`);
		const labels = map(message, (label: string, key: number) =>
			createElement("h3", { key }, label)
		);

		const mWrap = createElement("div", { className: "message-wrap" }, labels);
		return createElement("div", { className: "wrap", key: "wrap" }, mWrap);
	}

	render() {
		return [this.getBg(), this.getMessage(), createElement(BottomComposition)];
	}
}
