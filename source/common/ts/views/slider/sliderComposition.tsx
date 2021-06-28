import * as React from "react";
import each from "lodash/each";
import map from "lodash/map";
import Slide from "./slideView";
import { ISlider, ISlide } from "main-screen/ts/controllers/slider";

enum Status {
	preload,
	in,
	play,
	out
}

interface ISliderState {
	current: number;
	max: number;
	slidesStatus: [string, string];
	cicle: "hold" | "anim";
}

const _ANIM_DELAY = 500;

export default class SliderComposition extends React.Component<ISlider, ISliderState> {
	public state: ISliderState = {
		current: 0,
		max: 0,
		slidesStatus: [Status[1], Status[3]],	// tslint:disable-line
		cicle: "anim"
	};

	private list: ISlide[];
	private readonly slides: [ISlide, ISlide];

	private timer: number | null = null;

	constructor(props: ISlider) {
		super(props);
		this.list = props.slides;
		this.state.max = this.list.length;

		const { current } = this.state;
		this.slides = [this.list[current], this.list[current + 1]];
	}

	public render(): JSX.Element {
		this.start();
		return <div className={`slider ${this.props.lang || ""}`}>{map(this.slides, this.getSlide.bind(this))}</div>;
	}

	public componentWillReceiveProps(props: ISlider): void {
		console.log("change")
		this.list = props.slides;
		this.state.max = this.list.length;
		this.state.current = -1;
		this.state.cicle = "anim";
		each(this.state.slidesStatus, (status: string, key: number) => {
			const result: string = (Status[status] % 2) ? status : Status[Status[status] + 1] ;
			this.state.slidesStatus[key] = result;
		});
		
		this.next();
	}

	private start(): void {
		const { cicle, max } = this.state;
		const current = this.state.current > 0 ? this.state.current : 0;
		if (max < 1) return;
		const delay = cicle === "hold" ? _ANIM_DELAY : this.list[current].delay - _ANIM_DELAY;
		// -- const delay = cicle === "hold" ? _ANIM_DELAY : 3000 - _ANIM_DELAY;

		clearTimeout(this.timer as number);
		this.timer = null;
		this.timer = setTimeout(this.next.bind(this), delay);
	}

	private next(): void {
		let { current } = this.state;

		const slidesStatus: [string, string] = map(this.state.slidesStatus, (stat: string, key: 0 | 1) => {
			const isEnd: boolean = Status[stat] >= Status.out;
			if (isEnd) {
				current = (this.state.max <= (current + 1)) ? 0 : current + 1;
				this.slides[key] = this.list[current];
			}
			return isEnd ? Status[0] : Status[Status[stat] + 1];
		}) as [string, string];
		const cicle = this.toggleCicle();

		this.setState({ slidesStatus, cicle, current });
	}

	private toggleCicle(): "anim" | "hold" {
		return this.state.cicle === "hold" ? "anim" : "hold";
	}

	private getSlide(props: ISlide, index: 0 | 1): JSX.Element | null {
		if (props == undefined) return null;
		const { fullpath, text, color } = props;
		const status = this.state.slidesStatus[index];
		return React.createElement(Slide, { src: fullpath, text, color, index, key: index, status });
	}
}
