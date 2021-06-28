export enum Locale {
	en,
	ar,
	de,
	fr,
	ru,
	zh,
	es,
	it
}

export enum StepType {
	exp1,
	exp2,
	exp3,
	exp4,
	exp5,
	exp6,
	exp7,
	exp8,
	pcg1,
	pcg2,
	pcg3,
	pcg4,
	pcg5
}

export interface IKioskState {
	id: string;
	step: number;
	lang: Locale | null | string;
	stepType: StepType | null | string;
	timeStart: Date | null;
	timeEnd: Date | null;
	email: string | null;
}
