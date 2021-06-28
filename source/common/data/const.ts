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

export type interactionGraph = [["", ""], [string, number], [string, number]];

export type languageGraph = [
	["Task", "Day Visitors"],
	[string, number],
	[string, number],
	[string, number],
	[string, number],
	[string, number],
	[string, number],
	[string, number],
	[string, number]
];

export type interestGraph = [
	["Language", "Arts & Heritage", "Beaches", "Family Entertainment", "Spa", "Sports & Adventure", "Dining", "Shopping", "Events"],
	[string, number, number, number, number, number, number, number, number],
	[string, number, number, number, number, number, number, number, number],
	[string, number, number, number, number, number, number, number, number],
	[string, number, number, number, number, number, number, number, number],
	[string, number, number, number, number, number, number, number, number],
	[string, number, number, number, number, number, number, number, number],
	[string, number, number, number, number, number, number, number, number],
	[string, number, number, number, number, number, number, number, number]
];

export type timespentGraph = [
	[string, string],
	[string, number],
	[string, number],
	[string, number],
	[string, number],
	[string, number],
	[string, number],
	[string, number],
	[string, number],
	[string, number],
	[string, number],
	[string, number],
	[string, number],
	[string, number]
];

export type hourlyGraph = [
	["Users", "Users"],
	["00:00-00:30", number],
	["00:30-01:00", number],
	["01:00-01:30", number],
	["01:30-02:00", number],
	["02:00-02:30", number],
	["02:30-03:00", number],
	["03:00-03:30", number],
	["03:30-04:00", number],
	["04:00-04:30", number],
	["04:30-05:00", number],
	["05:00-05:30", number],
	["05:30-06:00", number],
	["06:00-06:30", number],
	["06:30-07:00", number],
	["07:00-07:30", number],
	["07:30-08:00", number],
	["08:00-08:30", number],
	["08:30-09:00", number],
	["09:00-09:30", number],
	["09:30-10:00", number],
	["10:00-10:30", number],
	["10:30-11:00", number],
	["11:00-11:30", number],
	["11:30-12:00", number],
	["12:00-12:30", number],
	["12:30-13:00", number],
	["13:00-13:30", number],
	["13:30-14:00", number],
	["14:00-14:30", number],
	["14:30-15:00", number],
	["15:00-15:30", number],
	["15:30-16:00", number],
	["16:00-16:30", number],
	["16:30-17:00", number],
	["17:00-17:30", number],
	["17:30-18:00", number],
	["18:00-18:30", number],
	["18:30-19:00", number],
	["19:00-19:30", number],
	["19:30-20:00", number],
	["20:00-20:30", number],
	["20:30-21:00", number],
	["21:00-21:30", number],
	["21:30-22:00", number],
	["22:00-22:30", number],
	["22:30-23:00", number],
	["23:00-23:30", number],
	["23:30-00:00", number]
];

export type dailyGraph = [
	["Days", "Interacted", { role: "annotation" }, "Aborted", { role: "annotation" }],
	["1", number, number, number, number],
	["2", number, number, number, number],
	["3", number, number, number, number],
	["4", number, number, number, number],
	["5", number, number, number, number],
	["6", number, number, number, number],
	["7", number, number, number, number],
	["8", number, number, number, number],
	["9", number, number, number, number],
	["10", number, number, number, number],
	["11", number, number, number, number],
	["12", number, number, number, number],
	["13", number, number, number, number],
	["14", number, number, number, number],
	["15", number, number, number, number],
	["16", number, number, number, number],
	["17", number, number, number, number],
	["18", number, number, number, number],
	["19", number, number, number, number],
	["20", number, number, number, number],
	["21", number, number, number, number],
	["22", number, number, number, number],
	["23", number, number, number, number],
	["24", number, number, number, number],
	["25", number, number, number, number],
	["26", number, number, number, number],
	["27", number, number, number, number],
	["28", number, number, number, number],
	["29", number, number, number, number],
	["30", number, number, number, number],
	["31", number, number, number, number]
];

export type collectedGraph = [
	["Emails", "Emails"],
	["1", number],
	["2", number],
	["3", number],
	["4", number],
	["5", number],
	["6", number],
	["7", number],
	["8", number],
	["9", number],
	["10", number],
	["11", number],
	["12", number],
	["13", number],
	["14", number],
	["15", number],
	["16", number],
	["17", number],
	["18", number],
	["19", number],
	["20", number],
	["21", number],
	["22", number],
	["23", number],
	["24", number],
	["25", number],
	["26", number],
	["27", number],
	["28", number],
	["29", number],
	["30", number],
	["31", number]
];

export type abortedGraph = [
	["", "", { role: "style" }, { role: "annotation" }],
	["Home Page", number, "#009BDF", number],
	["Experience or Packages Pages", number, "#CB5599", number],
	["Form", number, "#0067B9", number],
	["Thank You", number, "#63666a", number]
];

export type averageGraph = [["", ""], ["less 1 min", number], ["between 1 and 3 min", number], ["greater then 3 min", number]];
