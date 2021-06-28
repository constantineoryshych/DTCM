import ViewController from "~/cts/views/viewController.ts";

import IndexComposition from "./views/indexComposition.tsx";

import Ws from "./controllers/ws";
import Data from "./controllers/data";

import "./../style/stylesheets/main.sass";

class Main {
	public static async init(): Promise<void> {
		const ws = new Ws();
		Data.getData("en");
		const view = new ViewController(IndexComposition);
	}
}

Main.init();
