import { Component, createElement } from "react";
import map from "lodash/map";
import Data from "../../../controllers/data";
import { LangButtonView } from "./langButtonView";

export class LangButtonsComposition extends Component {
	public render(): JSX.Element {
		const className = "lang-grid";
		const inner = this.getButtonGrid();
		return createElement("div", { className }, inner);
	}

	private getButtonGrid(): JSX.Element[] {
		return map(Data.welcome, this.getButton.bind(this));
	}

	private getButton(
		item: {
			lang: string;
			text: string;
		},
		key: string
	): JSX.Element {
		return createElement(LangButtonView, { key, item });
	}
}
