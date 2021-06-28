import { Component, createElement } from "react";
import Data from "../../../controllers/data";
import SliderComposition from "~/cts/views/slider/sliderComposition";
import { LangButtonsComposition } from "./langButtonsComposition";
import { ISlider } from "main-screen/ts/controllers/slider";

export class WelcomeComposition extends Component {
	public render(): JSX.Element {
		const { slides } = Data.slideshow as ISlider;
		const CONTENT = [
			createElement(LangButtonsComposition, { key: "lb" }),
			createElement(SliderComposition, { slides, lang: "en", key: "slider" })
		];
		const className = "welcome-page";
		return createElement("div", { className }, CONTENT);
	}
}
