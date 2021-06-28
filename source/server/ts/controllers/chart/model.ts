import moment from "moment";
import map from "lodash/map";
import cloneDeep from "lodash/cloneDeep";
import CustomerSession from "~/server/models/customerSession.model";
import CustomerActivity from "~/server/models/customerActivity.model";
import ChartData from "~/data/charts/data";

import { ICustomerSession } from "~/@/model.d";

export default {
	interaction: async (before: number, after: number): Promise<(string | number)[][] | never> => {
		const timer = await CustomerSession.countDocuments({
			status: "timer",
			dateStart: { $gte: after, $lte: before }
		});
		const abort = await CustomerSession.countDocuments({
			status: "abort",
			dateStart: { $gte: after, $lte: before }
		});
		const success = await CustomerSession.countDocuments({
			status: "success",
			dateStart: { $gte: after, $lte: before }
		});

		return [["", ""], ["Interaction email", success], ["Interaction no email", abort], ["Interaction Timeout", timer]];
	},
	language: async (before: number, after: number): Promise<(string | number)[][] | never> => {
		const lang = await CustomerSession.aggregate([
			{ $match: { dateStart: { $gte: after, $lte: before } } },
			{
				$group: { _id: "$lang", count: { $sum: 1 } }
			}
		]);

		const result = [["", ""]];
		for (const { _id, count } of lang) {
			result.push([_id, count]);
		}

		return result;
	},

	interest: async (before: number, after: number): Promise<(string | number | { role: string })[][] | never> => {
		const sessions = await CustomerSession.find({ dateStart: { $gte: after, $lte: before } });

		const data = cloneDeep(ChartData.interest);

		const route = {
			ar: data[1],
			en: data[2],
			es: data[3],
			fr: data[4],
			ru: data[5],
			zh: data[6],
			de: data[7],
			it: data[8],
			exp1: 1,
			exp2: 3,
			exp3: 5,
			exp4: 7,
			exp5: 9,
			exp6: 11,
			exp7: 13,
			exp8: 15
		};

		for (const { _id, lang } of sessions) {
			const act = await CustomerActivity.find({ session: _id, primary: "3", secondary: { $regex: /exp/ } });

			for (const { secondary } of act) {
				route[lang][route[secondary]]++;
				route[lang][route[secondary]  + 1 ]++;
			}
		}

		return data;
	},
	email: async (before: number, after: number): Promise<(string | number)[][] | never> => {
		const emails = await CustomerSession.find({
			email: { $ne: null },
			dateStart: { $gte: after, $lte: before }
		});

		return [["", ""], ...map(emails, (email: ICustomerSession) => [email.email, email.lang])];
	},
	hourly: async (before: number, after: number): Promise<(string | number | { role: string })[][] | never> => {
		const data = cloneDeep(ChartData.hourly) as (string | number)[][];

		const sessions = await CustomerSession.find({ dateStart: { $gte: after, $lte: before } });

		for (const { dateStart } of sessions) {
			const time = moment.unix(dateStart).format("H:m");
			const [hour, minutes] = time.split(":");
			let row = 0;
			if (Number(hour) === 0) row = 1;
			else row = Number(hour) * 2 + 1;

			if (Number(minutes) > 30) row++;

			const value = Number(data[row][1]) + 1;

			data[row][1] = value;
			data[row][2] = value;
		}

		return data;
	},
	daily: async (before: number, after: number): Promise<(string | number)[][] | never> => {
		const data = cloneDeep(ChartData.daily) as (string | number)[][];

		const sessions = await CustomerSession.find({ dateStart: { $gte: after, $lte: before } });

		for (const { dateStart, status } of sessions) {
			const day = moment.unix(dateStart).format("D");
			const cell = status === "success" ? 1 : 3;

			data[Number(day)][cell] = Number(data[Number(day)][cell]) + 1;
			data[Number(day)][cell + 1] = Number(data[Number(day)][cell + 1]) + 1;
		}

		return data;
	},
	collected: async (before: number, after: number): Promise<(string | number | { role: string })[][] | never> => {
		const data = cloneDeep(ChartData.collected);

		const sessions = await CustomerSession.find({ dateStart: { $gte: after, $lte: before } });

		for (const { dateStart, status } of sessions) {
			const day = moment.unix(dateStart).format("D");
			if (status === "success") {
				const value = Number(data[Number(day)][1]) + 1;
				data[Number(day)][1] = value;
				data[Number(day)][2] = value;
			}
		}

		return data;
	},
	aborted: async (before: number, after: number): Promise<(string | number | { role: string })[][] | never> => {
		const data = cloneDeep(ChartData.aborted);

		const sessions = await CustomerSession.find({
			dateStart: { $gte: after, $lte: before },
			status: { $in: ["abort", "timer"] }
		});

		for (const { _id } of sessions) {
			const act = await CustomerActivity.findOne({ session: _id }).sort("-timestamp");

			if (act && act.primary && act.primary !== null) {
				try {
					data[Number(act.primary) - 1][1] = Number(data[Number(act.primary) - 1][1]) + 1;
					data[Number(act.primary) - 1][3] = Number(data[Number(act.primary) - 1][3]) + 1;
				} catch (err) {
					console.log(act.primary);
					console.log(act);
					continue;
				}
			}
		}

		return data;
	},
	timespent: async (before: number, after: number): Promise<(string | number)[][] | never> => {
		const data = cloneDeep(ChartData.timespent);

		const route = {
			exp1: 1,
			exp2: 2,
			exp3: 3,
			exp4: 4,
			exp5: 5,
			exp6: 6,
			exp7: 7,
			exp8: 8,
			pcg1: 9,
			pcg2: 10,
			pcg3: 11,
			pcg4: 12,
			pcg5: 13
		};

		const act = await CustomerActivity.find({
			primary: "3",
			secondary: { $regex: /(exp|pcg)/ },
			timestamp: { $gte: after, $lte: before }
		});

		for (const { session, timestamp, secondary } of act) {
			const next = await CustomerActivity.findOne({ session, timestamp: { $gte: timestamp } }).sort("-timestamp");

			if (!next) continue;
			const f = moment.unix(Number(timestamp));
			const s = moment.unix(Number(next.timestamp));

			const diff: number = s.diff(f, "seconds");
			if (Number.isNaN(diff)) continue;
			data[route[secondary]][1] = Number(data[route[secondary]][1]) + diff;
			// console.log(`${diff}s`, secondary);
		}

		for (const index in data) {
			if (typeof data[index][1] === "number")
				data[index][1] = Math.round(Number(data[index][1]) / 60);
		}

		return data;
	},
	emails: async (before: number, after: number): Promise<(string | number)[][] | never> => {
		const data: [string, string][] = [];
		const sessions = await CustomerSession.find({ email: { $ne: null }, dateStart: { $gte: after, $lte: before } });

		for (const { email, lang } of sessions) {
			data.push([lang, email]);
		}

		return data;
	},
	average: async (before: number, after: number): Promise<(string | number)[][] | never> => {
		const data: (string | number)[][] = cloneDeep(ChartData.average);
		const sessions = await CustomerSession.find({ dateStart: { $gte: after, $lte: before } });

		for (const { dateStart, dateEnd, status } of sessions) {
			const s = moment.unix(Number(dateStart));
			const e = moment.unix(Number(dateEnd));

			let diff: number = e.diff(s, "seconds");
			if (status === "success")
				diff -= 10;
			else if (status === "timer")
				diff -= 60;

			if (diff < 60) data[1][1] = Number(data[1][1]) + 1;
			else if (diff > 180) data[3][1] = Number(data[3][1]) + 1;
			else data[2][1] = Number(data[2][1]) + 1;
		}

		return data;
	}
};
