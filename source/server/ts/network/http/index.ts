import { createServer, Server, ServerOptions } from "spdy";
import { resolve } from "path";
import { readFileSync } from "fs";
import express from "express";
import serveStatic from "serve-static";
import compression from "compression";
import ip from "ip";
import Config from "./../../services/config";
import Logger from "./../../services/logger";
import Middleware from "./middleware";
import routes from "./routes";

import { AHttpServer } from "~/@/network.d";

const DEFAULT_PORT: number = 3000;

const options: ServerOptions = {
	key: readFileSync(resolve("./config/server.key"), "utf8"),
	cert: readFileSync(resolve("./config/server.crt"), "utf8")
};

class HttpServerClass implements AHttpServer {
	public readonly app: express.Express = express();
	public readonly server: Server = createServer(options, this.app);
	private readonly host: string = ip.address();
	private readonly port: number = Config.port || DEFAULT_PORT;

	public async init(): Promise<void> {
		this.initView();
		await this.start();

		this.initMiddleware();
		this.initRoutes();
		this.initGetHandlers();
	}

	public async start(): Promise<void> {
		try {
			await this.server.listen(this.port, this.host);
			const message = `Server ${this.host} is listening on port ${this.port}`;
			global.console.log(`${new Date()} ${message}`);
			await Logger.log(message);

			return;
		} catch (err) {
			await Logger.error(`HttpServer->start(): ${err}`);
		}
	}

	public async stop(): Promise<void> {
		try {
			await this.server.close();
			await Logger.log(`HttpServer->stop(): http server shutdown`);
		} catch (err) {
			await Logger.error(`HttpServer->stop():  ${err}`);
		}
	}

	private initMiddleware(): void {
		this.app.use(Middleware.cors);
		this.app.use(compression({ filter: Middleware.shouldCompress }));
	}

	private initView(): void {
		this.app.use("/ts", serveStatic(resolve("public/touch-screen")));
		this.app.use("/ms", serveStatic(resolve("public/main-screen")));
		this.app.use("/cp", serveStatic(resolve("public/control-panel")));
		this.app.use("/public", serveStatic(resolve("public")));
	}

	private initRoutes(): void {
		this.app.use("/api/check", routes.check);
		this.app.use("/api/locale", routes.locale);
		this.app.use("/api/get", routes.get);
		this.app.use("/api/chart", routes.chart);
	}

	private initGetHandlers(): void {
		this.app.get("/favicon.ico", Middleware.favicon);

		// // Touch screen Frontend
		// -- this.app.get("/ts*", Middleware.entry.bind(null, "ts"));

		// // Main screen Frontend
		// -- this.app.get("/ms*", Middleware.entry.bind(null, "ms"));

		// // Control panel Frontend
		// -- this.app.get("/cp*", Middleware.entry.bind(null, "cp"));

		// Protector
		this.app.get("/*", Middleware.entry.bind(null, "/"));
	}
}

export default HttpServerClass;
