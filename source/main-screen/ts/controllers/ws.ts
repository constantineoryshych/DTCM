import Ws from "~/cts/controllers/wsClient";
import Slider, { ISlider } from "./slider";

class WsControllerClass extends Ws {
	constructor() {
		super();
		this.initHandlers();
	}

	private initHandlers(): void {
		if (this.socket === null) return;
		this.socket.on("connect", () => {
			this.socket.emit("hello", "mainscreen");
		});

		this.socket.on("disconnect", (reason: string) => {
			console.log(`disconnect ${reason}`);
		});

		this.socket.on("stateUpdate", (message: ISlider) => {
			Slider.update(message);
		});
	}
}

export default WsControllerClass;
