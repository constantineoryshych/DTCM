import { Component, createElement } from "react";
import Data from "../../../controllers/data";
import Provider from "../../../services/provider";
import { LogoView } from "./logo";
import { TitleView } from "./title";
import { ButtonComposition } from "./button";

const _STEP_MODEL = Provider.getChild(["kiosk", "step"]);

export class HeaderComposition extends Component {
	public render(): JSX.Element {
		return createElement("header", null, this.getContent());
	}

	private getColors(): { logo: string; title: string } {
		try {
			const step = _STEP_MODEL.get();
			const { logo, title } = Data.theme.steps[step].colors;
			return { logo, title };
		} catch (err) {
			return { logo: "color", title: "blue" };
		}
	}

	private getContent(): JSX.Element[] {
		const colors = this.getColors();
		return [
			createElement(ButtonComposition, { key: "b" }),
			createElement(TitleView, { color: colors.title, key: "t" }),
			createElement(LogoView, { color: colors.logo, key: "l" })
		];
	}
}
