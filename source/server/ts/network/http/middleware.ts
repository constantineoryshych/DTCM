import { Request, Response } from "express";
import { resolve } from "path";
import compression from "compression";

import { AHttpMiddlewares } from "~/@/network.d";

const FAVICON_STATUS_CODE: number = 204;

class Middlewares implements AHttpMiddlewares {
	public static cors(req: Request, res: Response, next: () => void): void {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Credentials", "true");
		res.header("Access-Control-Allow-Methods", "GET, POST");
		// -- res.header("Access-Control-Allow-Headers", "Cache-Control");
		res.header("Cache-Control", "public, max-age=0");
		next();
	}

	public static shouldCompress(req: Request, res: Response): any | false { // tslint:disable-line
		return req.headers["x-no-compression"] ? false : compression.filter(req, res);
	}

	public static entry(type: string, req: Request, res: Response): void {
		try {
			let dir: string | null = null;
			switch (type) {
				case "ts":
					dir = "touch-screen";
					break;
				case "ms":
					dir = "main-screen";
					break;
				case "cp":
					dir = "control-panel";
					break;
				default:
					throw new Error("Unhandled path");
			}
			res.sendFile(resolve(`./public/${dir}/index.html`));
		} catch (err) {
			res.send("Nothing here");
		}
	}

	public static favicon(req: Request, res: Response): void {
		res.sendStatus(FAVICON_STATUS_CODE);
	}
}

export default Middlewares;
