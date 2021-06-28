import * as React from "react";
import SliderComposition from "~/cts/views/slider/sliderComposition.tsx";
import Slider, { ISlide } from "./../controllers/slider";

export default class IndexComposition extends React.Component {
	public render(): JSX.Element {
		return <SliderComposition slides={Slider.list} lang={Slider.lang} />;
	}

	public componentDidMount(): void {
		Slider.on(() => {
			this.setState({ });
		});
	}
}