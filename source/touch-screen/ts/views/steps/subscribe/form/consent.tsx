import { Component, createElement } from "react";
import Data from "./../../../../controllers/data";
import { CheckboxView } from "./checkbox";

export class ConsentView extends Component {
	public render(): JSX.Element {
		const options = { className: "checkbox-wrap" };
		return createElement("div", options, this.getInner());
	}

	private getInner(): JSX.Element[] {
		const { dslmCb1, dslmCb2 } = Data.lang.label;

		return [
			createElement(CheckboxView, { key: "p", name: "personal", desc: dslmCb1 }),
			createElement(CheckboxView, { key: "t", name: "terms", desc: dslmCb2 })
		];
	}
}