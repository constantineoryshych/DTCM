import { Router, Response, Request } from "express";
import * as bodyParser from "body-parser";
import moment from "moment";
import map from "lodash/map";
import Slider from "~/server/models/slider.model";
import Grid from "~/server/models/grid.model";
import GridRow from "~/server/models/gridRow.model";
import GridBlock from "~/server/models/gridBlock.model";
import Logger from "~/server/services/logger";

import { ISlider, IGrid } from "~/@/model.d";

const router = Router();

router.use(bodyParser.json());

const CODE = 403;

router.get("/slider/:key", (req: Request, res: Response) => {
	const { key } = req.params;

	Slider.findOne({ key })
		.populate({ path: "slides", model: "slide" })
		.exec(
			(err: Error, slider: ISlider | null): void => {
				if (err) {
					Logger.error(`API->get->slider: key ${key}, ${err}`);
					res.sendStatus(CODE);
				} else res.send(slider);
			}
		);
});

router.get("/grid/:key", (req: Request, res: Response) => {
	const { key } = req.params;

	Grid.findOne({ key }).exec(
		async (err: Error, grid: IGrid | null): Promise<void> => {
			if (err || grid === null) {
				Logger.error(`API->get->grid: key ${key}, ${err}`);
				res.sendStatus(CODE);
			} else res.send(grid.grid);
		}
	);
});

router.get("/grid-elem/:id", async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const row = await GridRow.findById(id);

		if (row === null) {
			const block = await GridBlock.findById(id);
			if (block === null) res.sendStatus(CODE);
			else res.send(block);
		} else res.send(row);
	} catch (err) {
		Logger.error(`API->get->grid-elem: id ${id}, ${err}`);
		res.sendStatus(CODE);
	}
});

export default router;
