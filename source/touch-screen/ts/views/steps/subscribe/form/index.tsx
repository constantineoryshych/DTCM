import React, { Component, createElement } from "react";
import { FormController } from "./../../../../controllers/form";
import Data from "./../../../../controllers/data";
import { InputView } from "./input";
import { ConsentView } from "./consent";

export class FormComposition extends Component {
	public componentDidMount(): void {
		FormController.reset();
	}

	public componentWillUnmount(): void {
		FormController.reset();
	}

	public render(): JSX.Element {
		const { formTitle, dslmTitle, dslmP1, dslmP2 } = Data.lang.label;
		return (
			<div className="form-wrap">
				{createElement("h2", null, formTitle)}
				<InputView />
				<div className="row">
					{createElement("h2", null, dslmTitle)}
					<p>required fields</p>
				</div>
				{createElement("p", null, dslmP1)}
				{createElement("p", null, dslmP2)}
				<ConsentView />
			</div>
		);
	}
}
