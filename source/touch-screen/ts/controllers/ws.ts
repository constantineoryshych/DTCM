import Ws from "~/cts/controllers/wsClient";
import Provider from "../services/provider";
import { IKioskState } from "~/@/const";

const KIOSK_MODEL = Provider.getChild("kiosk");

class WsControllerClass extends Ws {
	constructor() {
		super();
		this.initHandlers();
	}

	private initHandlers(): void {
		if (this.socket === null) return;
		this.socket.on("connect", () => {
			this.socket.emit("hello", "touchscreen");
		});

		this.socket.on("disconnect", (reason: string) => {
			console.log(`disconnect ${reason}`);
		});

		this.socket.on("stateUpdate", (message: IKioskState) => {
			const { lang, step, stepType, id } = message;
			KIOSK_MODEL.set({ lang, step, stepType, id });
		});
	}
}

export default new WsControllerClass();
