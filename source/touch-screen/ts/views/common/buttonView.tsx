import { Component, createElement } from "react";
import kebabCase from "lodash/kebabCase";
import Data from "../../controllers/data";
import { Events } from "../../controllers/events";

export interface IButtonProps {
	disable?: boolean;
	onClick?: Function;
	type: string;
	text?: string;
}

export class ButtonView extends Component<IButtonProps> {
	public render(): JSX.Element {
		return createElement("div", this.getOptions(), this.getText());
	}

	private getClassName(): string {
		let className = `button ${kebabCase(this.props.type)}`;
		if (this.props.disable === true) className += ` disable`;
		return className;
	}

	private getOnClick(): Function {
		return this.props.disable === true
			? null
			: this.props.onClick || Events[this.props.type];
	}

	private getOptions(): object {
		const className = this.getClassName();
		const onClick = this.getOnClick();
		return { className, onClick };
	}

	private getText(): JSX.Element {
		const text = this.props.text || Data.lang.button[this.props.type];
		return createElement("p", null, text);
	}
}
