import { Socket } from "socket.io";
import Logger from "~/server/services/logger";

import { AKioskStateClass } from "~/@/kiosk.d";
import { IHandlerOptions } from "~/@/network.d";

export abstract class BaseHandler {
	protected readonly socket: Socket;
	protected readonly room: string;
	protected readonly kiosk: AKioskStateClass;
	protected readonly address: string;

	constructor(options: IHandlerOptions) {
		this.socket = options.socket;
		this.address = options.address;
		this.kiosk = options.kiosk;
		this.room = this.kiosk.state.id;
		this.init();
		this.initHandlers();
	}

	public async close(reason: string | null = null): Promise<void> {
		const { address } = this.socket.handshake;
		const message = `Client disconnected: ${address} by reason: ${reason}`;
		await Logger.writeLog("connect", message);
		this.socket.leave(this.room);
	}

	protected abstract initHandlers(): void;

	protected init(): void {
		Logger.writeLog("connect", `Client connected: ${this.address}`);
		this.socket.join(this.room);
	}
}
