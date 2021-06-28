import { Document } from "mongoose";
import { StepType } from "./const";

export interface IKiosk {
	name: string;
	touchScreenIp: string;
	mainScreenIp: string;
}

export interface IKioskSchema extends Document, IKiosk {
	name: string;
	touchScreenIp: string;
	mainScreenIp: string;
}

export type TaddSort = () => void;

export interface ISlide {
	file: string;
	path: string;
	text: string[];
	color: "w" | "b";
	delay: number;
	sort: number;
	fullpath: string;
	addSort: TaddSort;
}

export interface ISlideSchema extends Document, ISlide {
	file: string;
	path: string;
	text: string[];
	color: "w" | "b";
	delay: number;
	sort: number;
	fullpath: string;
	addSort: TaddSort;
}

export interface ISlider {
	key: string;
	slides: string[] | ISlide[];
}

export interface ISliderSchema extends Document, ISlider {
	key: string;
	slides: string[] | ISlideSchema[];
}

export interface ISliderWrap {
	step: number;
	stepType: StepType | null;
	screen: "touchScreen" | "mainScreen";
	slider: string | ISlider;
}

export interface ISliderWrapSchema extends Document, ISliderWrap {
	step: number;
	stepType: StepType | null;
	screen: "touchScreen" | "mainScreen";
	slider: string | ISliderSchema;
}

export interface IGridBlock {
	type: "jpg" | "mp4";
	lang: boolean;
	name: string;
	size: string;
	likes: number;
}

export interface IGridBlockSchema extends Document, IGridBlock {}

export interface IGridRow {
	row: IGridBlock[] | IGridRow;
	column: boolean;
	reverse: boolean;
}

export interface IGridRowSchema extends Document, IGridRow {}

export interface IGrid {
	grid: IGridRow[];
	path: string;
	key: string;
}

export interface IGridSchema extends Document, IGrid {}


export interface ICustomerSession {
	lang: string;
	email: string;
	dateStart: number;
	dateEnd: number;
	status: "success" | "timer" | "crash";
	kiosk: string;
}

export interface ICustomerSessionSchema extends Document, ICustomerSession {}

export interface ICustomerActivity {
	session: string;
	event: string;
	timestamp: string;
	primary: string;
	secondary: string;
}

export interface ICustomerActivitySchema extends Document, ICustomerActivity {}

export interface IGraph {
	type: string,
	period: string;
	periodEnded: boolean;
	collected: Date;
	data: (string | number | { role: string })[][];
}

export interface IGraphSchema extends Document, IGraph {}