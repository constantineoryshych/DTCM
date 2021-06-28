import { Router, Response, Request } from "express";
import * as bodyParser from "body-parser";
import Logger from "~/server/services/logger";
import { ChartController } from "~/server/controllers/chart";

const router = Router();

router.use(bodyParser.json());

const FOUND = 302;
const CODE = 403;

router.get(
	"/:type/:year/:month",
	async (req: Request, res: Response): Promise<void> => {
		const { type, year, month } = req.params;

		try {
			const result = await ChartController.get(type, year, month);
			res.send(result);
		} catch (err) {
			if (err.message === "inProgress") {
				res.sendStatus(FOUND);
				return;
			}
			Logger.error(`API->stat->${type}: ${err}`);
			res.sendStatus(CODE);
		}
	}
);

export default router;
