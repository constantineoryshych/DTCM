import ViewController from "~/cts/views/viewController";
import { IndexComposition } from "./views";

import "./../style/stylesheets/main.sass";

class Main {
	public static async init(): Promise<void> {
		try {
			new ViewController(IndexComposition);
		} catch (err) {
			console.warn(err);
		}
	}
}

Main.init();
