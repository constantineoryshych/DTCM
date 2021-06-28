import { EventEmitter } from "events";
import { IKioskSchema, ISlide } from "./model";
import { IKioskState, Locale, StepType } from "./const";

export abstract class AKioskListClass extends EventEmitter {
	public list: { [id: string]: AKioskStateClass };

	public init(list: IKioskSchema[]): void;

	public getKioskByIp(address: string): AKioskStateClass | false | never;
	public getTouchScreenByIp(touchScreenIp: string): AKioskStateClass | false | never;
	public getMainScreenByIp(mainScreenIp: string): AKioskStateClass | false | never;
}

export abstract class AKioskStateClass extends EventEmitter {
	public state: IKioskState;
	public mainScreen?: AMainScreen;
	public session?: ACustomerSession;

	public update(newState: object): void;
	public reset(): void;
}

export interface ISlider {
	step: number;
	stepType: StepType | null | string;
	lang: Locale | null | string;
	slides: string[] | ISlide[];
}

export abstract class AMainScreen extends EventEmitter {
	public slider: ISlider;
	public slides: ISlide[] | string[];

	public static forDefault(lang: Locale | null | string): ISlider;
}

export abstract class ACustomerSession {}
