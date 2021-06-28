import ViewController from "~/cts/views/viewController";
import { IndexComposition } from "./views/indexComposition.tsx";
import DataController from "./controllers/data";
import { StateController } from "./controllers/state";

import "./../style/stylesheets/main.sass";

class Main {
	public static async init(): Promise<void> {
		try {
			await DataController.init();
			new StateController();
			new ViewController(IndexComposition);
		} catch (err) {
			console.warn(err);
		}
	}
}

Main.init();
