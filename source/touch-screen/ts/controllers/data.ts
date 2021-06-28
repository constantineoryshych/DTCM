import { Request } from "../services/request";
import { ISlider } from "~/@/kiosk";
import { StepType } from "~/data/const";
import { IGrid } from "~/@/model";

const ROUTES = {
	theme: `/public/content-library/gui/touch-screen/theme.json`,
	welcome: `/public/content-library/data/welcome.json`,
	slideshow: `/api/get/slider/welcome`
};

export interface IExperience {
	name: string;
	header: string;
	title: string;
	desc: string;
}

export interface IExperiences {
	[key: string]: IExperience;
}

export interface ILang {
	button: { [key: string]: string };
	experience: IExperiences;
	title: {
		[key: string]: string;
	},
	label: {
		[key: string]: string;
	};
}

export interface ITheme {
	steps: {
		[key: string]: {
			colors: {
				title: string;
				logo: string;
			};
			bg?: string;
		};
	};
}

export type TGrid = IGridRow[];

export interface IGridRow {
	column?: boolean;
	type?: string;
	reverse?: boolean;
	row: IGridBlock[] | IGridRow;
}

export interface IGridBlock {
	type: "jpg" | "mp4";
	name: string;
	size: string;
}

class DataController {
	public theme: ITheme;
	public lang: ILang;
	public welcome: object;
	public grid: TGrid;
	public slideshow: ISlider;

	public async init(): Promise<void | never> {
		this.theme = (await this.get("theme")) as ITheme;
		this.welcome = await this.get("welcome");
		this.slideshow = (await this.get("slideshow")) as ISlider;

		this.getLang("en");
	}

	public async getLang(lang: string): Promise<void | never> {
		this.lang = (await this.get(`/public/content-library/data/${lang}/ui.json`)) as ILang;
		console.log("lang received");
	}

	public async getGrid(stepType: StepType): Promise<void | never> {
		this.grid = (await this.get(`/api/get/grid/${stepType}`)) as TGrid;
	}

	public async getGridRow(id: string): Promise<object | never> {
		const row = await this.get(`/api/get/grid-elem/${id}`);
		return row;
	}

	private async get(type: string): Promise<object | never> {
		const data = await Request.get(ROUTES[type] || type);
		if (data === null) throw new Error(`Data '${type}' not received`);
		return data;
	}
}

export default new DataController();
