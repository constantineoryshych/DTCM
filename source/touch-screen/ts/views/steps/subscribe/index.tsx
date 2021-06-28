import React, { Component, createElement } from "react";
import { FormController } from "../../../controllers/form";
import Provider from "../../../services/provider";
import Data from "../../../controllers/data";
import { FormComposition } from "./form";
import { PolicyView } from "./policy";
import { BottomComposition } from "./bottom";

const TYPES = {
	form: FormComposition,
	policy: PolicyView
};

const TYPE_MODEL = Provider.getChild(["form", "type"]);

const PATH = `/public/content-library/gui/touch-screen/bg/`;

interface ISubscribeState {
	type: "form" | "policy";
}

export class SubscribeComposition extends Component<{}, ISubscribeState> {
	public state: ISubscribeState = { type: TYPE_MODEL.get() };
	private unsubscribe: () => void;

	public componentDidMount(): void {
		FormController.reset();
		this.unsubscribe = TYPE_MODEL.subscribe(this.update.bind(this));
	}

	public componentWillUnmount(): void {
		this.unsubscribe();
	}

	public render(): JSX.Element[] {
		const { type } = this.state;
		return [this.getInner(), createElement(BottomComposition, { type, key: "b" })];
	}

	private update(type: "form" | "policy"): void {
		this.setState({ type });
	}

	private getBg(): JSX.Element {
		const src = PATH + Data.theme.steps["4"].bg;
		const img = createElement("img", { src });
		const className = `bg`;

		return createElement("div", { className, key: "bg" }, createElement("div"), img);
	}

	private getContent(): JSX.Element {
		// return TYPES[this.state.type] !== "" ? createElement(TYPES[this.state.type]) : null;
		return createElement(TYPES[this.state.type]);
	}

	private getInner(): JSX.Element {
		const className = `form-wrapper ${this.state.type}`;
		return createElement("div", { className, key: "c" }, this.getBg(), this.getContent());
	}
}
