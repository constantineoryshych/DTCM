import Emitter from "event-emitter";
import { each, map } from "lodash";
import { Locale, StepType } from "~/data/const";
import Data from "./data";

export interface ISlide {
	file: string;
	path: string;
	text: string[];
	color: "w" | "b";
	delay: number;
	sort: number;
	fullpath: string;
}

export interface ISlider {
	step?: number;
	stepType?: StepType | null;
	key?: string;
	lang: string | null;
	slides: ISlide[];
}

export type Tlistener = () => void;

class SliderController {
	private slider: ISlider = { slides: [], lang: Locale[0] };
	private listeners: Tlistener[] = [];

	public get list(): ISlide[] {
		return this.slider.slides;
	}

	public get lang(): string | null {
		return this.slider.lang;
	}

	public async update(slider: ISlider): Promise<void> {
		if (this.slider.key === slider.key) return;
		if (slider.lang !== null && this.lang !== slider.lang) {
			await Data.getData(slider.lang);
		}
		
		this.slider = slider;
		this.translate();
		this.emit();
	}

	public on(listener: Tlistener): void {
		this.listeners.push(listener);
	}

	private emit(): void {
		for (const listener of this.listeners) {
			listener();
		}
	}

	private translate(): void {
		this.slider.slides = map(this.list, (slide: ISlide) => {
			if (slide.text.length === 3) return slide;
			slide.text = map(slide.text, (str: string) => Data.getField(str));
			return slide;
		});
	}
}

export default new SliderController();
