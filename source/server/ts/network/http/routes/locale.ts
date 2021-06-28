import { Router, Response, Request } from "express";
import { resolve } from "path";
import { readFile } from "fs";
import * as bodyParser from "body-parser";
import Logger from "~/server/services/logger";

const router = Router();

router.use(bodyParser.json());

const PATH = resolve("./public/content-library/data/");
const CODE = 403;

router.get("/:lang/ms", (req: Request, res: Response) => {
	readFile(`${PATH}/${req.params.lang}/ms.json`, "utf-8", (err: Error, content: string) => {
		if (err) {
			Logger.error(`API->MS: ${err}`);
			res.sendStatus(CODE);
		} else res.send(content);
	});
});

export default router;
