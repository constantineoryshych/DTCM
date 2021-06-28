import { Socket } from "socket.io";
import KioskList from "~/server/controllers/kioskList";
import Logger from "~/server/services/logger";
import TouchScreenHandler from "./handlers/touchScreen";
import MainScreenHandler from "./handlers/mainScreen";

export type TController = TouchScreenHandler | MainScreenHandler | null;

const SWITCHER = {
	mainscreen: [KioskList.getMainScreenByIp, MainScreenHandler],
	touchscreen: [KioskList.getTouchScreenByIp, TouchScreenHandler]
};

class WsMiddleware {
	public static getController(socket: Socket, type: string): TController {
		const { address } = socket.handshake;
		return WsMiddleware.switchController(address, socket, type);
	}

	public static switchController(address: string, socket: Socket, type: string): TController {
		console.log(type, address);
		const way = SWITCHER[type] || SWITCHER.touchscreen;
		if (typeof way === "undefined") return null;

		try {
			const kiosk = way[0].call(KioskList, address);
			if (!kiosk || typeof kiosk.state !== "object") return null;

			return new way[1]({ socket, kiosk, address });
		} catch (err) {
			Logger.error(`WsMiddleware->switchController(): address: ${address}, type: ${type} catch error: ${err.message}`);
			return null;
		}
	}
}

export default WsMiddleware;
