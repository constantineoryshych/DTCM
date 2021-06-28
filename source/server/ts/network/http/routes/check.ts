import { Router, Response, Request } from "express";
import * as bodyParser from "body-parser";
import Logger from "~/server/services/logger";
import KioskList from "~/server/controllers/kioskList";
import Sender from "~/server/controllers/sender";

const router = Router();

router.use(bodyParser.json());

router.get("/:ip/state", (req: Request, res: Response) => {
	const kiosk = KioskList.getKioskByIp(req.params.ip);
	const result = kiosk ? kiosk.state : `Kiosk ${req.params.ip} not exist`;
	res.json(result);
});

router.get("/:ip/state/:step/:lang?/:stepType*?", (req: Request, res: Response) => {
	const kiosk = KioskList.getKioskByIp(req.params.ip);
	const step = parseInt(req.params.step);
	const lang = req.params.lang || "en";
	const stepType = req.params.stepType || null;
	console.log(req.params);
	kiosk && kiosk.update({ step, lang, stepType });
	const result = kiosk ? kiosk.state : `Kiosk ${req.params.ip} not exist`;
	res.json(result);
});

router.get("/:ip/slider", (req: Request, res: Response) => {
	const kiosk = KioskList.getKioskByIp(req.params.ip);
	const result = kiosk && kiosk.mainScreen ? kiosk.mainScreen.slides : `Kiosk ${req.params.ip} not exist`;
	res.json(result);
});

router.get("/mail/:lang/:exp1/:exp2", async (req: Request, res: Response) => {
	const { lang, exp1, exp2 } = req.params;
	const result = await Sender.__TEST_TEMPLATE(lang, exp1, exp2);
	res.send(result);
});

export default router;
