import GridBlock from "./../../source/server/ts/models/gridBlock.model";
import GridRow from "./../../source/server/ts/models/gridRow.model";
import Grid from "./../../source/server/ts/models/grid.model";

import exp1 from "./exp1.json";
import exp2 from "./exp2.json";
import exp3 from "./exp3.json";
import exp4 from "./exp4.json";
import exp5 from "./exp5.json";
import exp6 from "./exp6.json";
import exp7 from "./exp7.json";
import exp8 from "./exp8.json";
import pcg1 from "./pcg1.json";
import pcg2 from "./pcg2.json";
import pcg3 from "./pcg3.json";
import pcg4 from "./pcg4.json";
import pcg5 from "./pcg5.json";

import { IGrid, IGridRow, IGridBlock } from "~/@/model.d";

const start = async (source: IGrid, name: string): Promise<void> => {
	const grid = [];

	for (const row of source) {
		const id: string = await getRow(row);
		grid.push(id);
	}

	await Grid.create({
		grid,
		path: "",
		key: name
	});
};

const getRow = async (row: IGridRow): Promise<string> => {
	const row1: string[] = [];

	for (const block of row.row) {
		const id: string = block.row ? await getRow(block) : await getBlock(block);
		row1.push(id);
	}

	const mR = await GridRow.create({
		row: row1,
		column: row.column ? row.column : false,
		reverse: row.reverse ? row.reverse : false
	});

	return mR._id;
};

const getBlock = async (block: IGridBlock): Promise<string> => {
	const mB = await GridBlock.create(block);
	return mB._id;
};

export default async (): Promise<void> => {
	await Promise.all([
		start(exp1, "exp1"),
		start(exp2, "exp2"),
		start(exp3, "exp3"),
		start(exp4, "exp4"),
		start(exp5, "exp5"),
		start(exp6, "exp6"),
		start(exp7, "exp7"),
		start(exp8, "exp8"),
		start(pcg1, "pcg1"),
		start(pcg2, "pcg2"),
		start(pcg3, "pcg3"),
		start(pcg4, "pcg4"),
		start(pcg5, "pcg5")
	]);
};
