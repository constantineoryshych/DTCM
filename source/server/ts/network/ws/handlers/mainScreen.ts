import { Socket } from "socket.io";
import Logger from "~/server/services/logger";
import { BaseHandler } from "./base";

import { IHandlerOptions } from "~/@/network.d";
import { ISlider } from "~/@/kiosk.d";

class MainScreenHandler extends BaseHandler {
	protected initHandlers(): void {
		if (this.kiosk.mainScreen === undefined) return;
		this.kiosk.mainScreen.on("update", (slider: ISlider) => {
			this.socket.emit("stateUpdate", slider);
		});

		// -- this.socket.on("sliderError", message => {
		// 	// --
		// });
	}

	protected init(): void {
		super.init();
		if (this.kiosk.mainScreen === undefined) return;
		this.socket.emit("stateUpdate", this.kiosk.mainScreen.slider);
	}
}

export default MainScreenHandler;
