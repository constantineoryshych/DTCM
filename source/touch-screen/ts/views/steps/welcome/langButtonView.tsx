import { Component, createElement } from "react";
import { Events } from "../../../controllers/events";
import { ButtonView, IButtonProps } from "../../common/buttonView";

export interface ILangButtonProps {
	item: {
		lang: string;
		text: string;
	}
}

export class LangButtonView extends Component<ILangButtonProps> {
	public render(): JSX.Element {
		return createElement(ButtonView, this.getOptions());
	}

	private getOptions(): IButtonProps {
		const { lang, text } = this.props.item;
		const type = lang;
		const onClick = Events.langChange.bind(null, lang);

		return { text, onClick, type };
	}
}
