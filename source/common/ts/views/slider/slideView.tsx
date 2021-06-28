import * as React from "react";
import endsWith from "lodash/endsWith";
import map from "lodash/map";

enum Status {
	preload,
	in,
	play,
	out
}

type T = React.DetailedReactHTMLElement<{}, HTMLElement>;

interface ISlideState {
	status: string;
}

export interface ISlideProps {
	src: string;
	text: string[];
	color: "b" | "w";
	index: 0 | 1;
	status: string;
}

export default class SlideView extends React.Component<ISlideProps, ISlideState> {
	public state: ISlideState = {
		status: Status[0]
	};

	public componentWillMount(): void {
		if (this.props.index === 0) this.state.status = Status[1];
	}

	public render(): JSX.Element {
		const className = this.className;
		return React.createElement("div", { className }, this.inner, this.text);
	}

	private get className(): string {
		return `slide ${this.props.status}`;
	}

	private get inner(): JSX.Element {
		const { src } = this.props;
		return endsWith(src, ".mp4") ? this.videoSlide(src) : this.imageSlide(src);
	}

	private imageSlide(src: string): JSX.Element {
		return React.createElement("img", { src });
	}

	private videoSlide(src: string): JSX.Element {
		// -- const autoPlay = this.props.status === Status[2] ? true : false;
		return React.createElement("video", { src, loop: true, autoPlay: true });
	}

	private get text(): JSX.Element {
		const { text, color } = this.props;
		const inner: T[] = map(text, (str: string, key: number): T => React.createElement("p", { key }, str));
		let className = text[2] === "NOW" ? `${color} triple` : color; // tslint:disable-line
		className = !text[2] ? (className  + ` oneString`) : color; // tslint:disable-line
		return React.createElement("div", { className }, inner);
	}
}
