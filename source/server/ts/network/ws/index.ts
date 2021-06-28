import io, { Socket } from "socket.io";
import Logger from "./../../services/logger";
import { Server } from "https";
import SocketController, { TController } from "./middleware";

import { AWsServer } from "~/@/network.d";

class WsServerClass implements AWsServer {
	private io: io.Server | null = null;

	public async init(http: Server): Promise<void> {
		this.io = io(http);
		this.handlers();

		await Logger.log(`Server WebSocket is listening`);
	}

	public async stop(): Promise<void> {
		if (this.io === null) return;
		try {
			this.io.close();
			this.io = null;
			await Logger.log(`WsServer->stop(): ws server shutdown`);
		} catch (err) {
			await Logger.error(`WsServer->stop(): ${err}`);
		}
	}

	private handlers(): void {
		if (this.io === null) return;

		this.io.on("error", (err: Error) => {
			Logger.error(`WsServer: ${err}`);
		});

		this.io.on("connection", (socket: Socket) => {
			let controller: TController | null = null;

			socket.on("hello", (type: string) => {
				controller = SocketController.getController(socket, type);
			});
			
			socket.on("disconnect", async (reason: string) => {
				if (controller === null) return;
				await controller.close(reason);
				controller = null;
			});
		});
	}
}

export default WsServerClass;
