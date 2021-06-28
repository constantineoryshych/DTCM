import { Component, createElement } from "react";
import { WaitScreen } from "./wait";
import { StepsComposition } from "./steps";

export class IndexComposition extends Component<{}, {}> {
	public render(): JSX.Element[] {
		return [
			createElement(StepsComposition, { key: "main" }),
			createElement(WaitScreen, { key: "wait" })
		];
	}
}
