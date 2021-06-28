import { Socket } from "socket.io";
import Logger from "~/server/services/logger";
import Sender from "~/server/controllers/sender";
import GridBlock from "~/server/models/gridBlock.model";
import defaultState from "~/cts/controllers/kiosk-state/kioskState.default";
import { BaseHandler } from "./base";

import { IHandlerOptions } from "~/@/network.d";
import { IKioskState } from "~/@/const";

class TouchScreenHandler extends BaseHandler {
	constructor(options: IHandlerOptions) {
		super(options);
	}

	public async close(reason: string | null = null): Promise<void> {
		await super.close(reason);
		this.kiosk.reset();
	}

	protected initHandlers(): void {
		this.kiosk.on("update", (state: IKioskState) => {
			this.socket.emit("stateUpdate", state);
		});

		this.socket.on("clientEvent", (message: IKioskState) => {
			this.kiosk.update(message);
		});

		this.socket.on("clientLike", async (message: { id: string }) => {
			await GridBlock.findByIdAndUpdate(message.id, { $inc: { likes: 1 } });
		});

		this.socket.on("clientUnLike", async (message: { id: string }) => {
			await GridBlock.findByIdAndUpdate(message.id, { $inc: { likes: -1 } });
		});

		this.socket.on("sessionClose", (message: { reason: string }) => {
			if (message.reason === `Back to Welcome step`) {
				const state = defaultState(this.kiosk.state.id);
				state.step = 1;
				this.kiosk.update(state);
			} else this.kiosk.reset();
		});
	}
}

export default TouchScreenHandler;
