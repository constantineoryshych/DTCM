import React, { Component, createElement } from "react";
import Data from "./../../../../controllers/data";
import Provider from "./../../../../services/provider";

interface ICheckboxViewProps {
	name: string;
	desc: string;
}

interface ICheckboxViewState {
	checked: boolean;
}

export class CheckboxView extends Component<ICheckboxViewProps, ICheckboxViewState> {
	public state: ICheckboxViewState = {
		checked: false
	};

	private readonly _STATE_MODEL;
	private unsibscribe: () => void;

	constructor(props: ICheckboxViewProps) {
		super(props);
		this._STATE_MODEL = Provider.getChild(["form", "checkbox", props.name]);
		this.state.checked = this._STATE_MODEL.get();
	}

	public componentDidMount(): void {
		this.unsibscribe = this._STATE_MODEL.subscribe(this.update.bind(this));
	}

	public componentWillUnmount(): void {
		this.unsibscribe();
	}

	public render(): JSX.Element {
		return (
			<div>
				{this.state.checked ? null : this.getNotice()}
				<div className="item">
					{this.getCheckbox()}
					{createElement("p", null, this.props.desc)}
				</div>
			</div>
		);
	}

	private update(checked: boolean): void {
		this.setState({ checked });
	}

	private toogle(): void {
		this._STATE_MODEL.set(!this.state.checked);
	}

	private getNotice(): JSX.Element {
		const { dslmCbRequire } = Data.lang.label;
		const message = createElement("div", null, dslmCbRequire);
		return createElement("div", { className: "notice" }, message);
	}

	private getCheckbox(): JSX.Element {
		const options = {
			className: this.state.checked ? "checked" : "",
			onClick: this.toogle.bind(this)
		};
		return createElement("div", options);
	}
}
