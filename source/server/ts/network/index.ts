import Logger from "./../services/logger";
import HttpServer from "./http";
import WsServer from "./ws";

import { AServerController, AHttpServer, AWsServer } from "~/@/network.d";

class ServerController implements AServerController {
	private readonly http: AHttpServer = new HttpServer();
	private ws: AWsServer = new WsServer();

	public async init(): Promise<void> {
		await this.initHttp();
		await this.initWs();
	}

	public async stop(): Promise<void> {
		await this.http.stop();
		await this.ws.stop();
	}

	private async initHttp(): Promise<void> {
		try {
			await this.http.init();
		} catch (err) {
			await Logger.error(`ServerController->initHttp():`, err);
		}
	}

	private async initWs(): Promise<void> {
		try {
			await this.ws.init(this.http.server);
		} catch (err) {
			await Logger.error(`ServerController->initWs():`, err);
		}
	}
}

export default new ServerController();
