import Logger from "./services/logger";
import Server from "./network";
import DB from "./services/mongo";
import KioskList from "./controllers/kioskList";
import Sender from "./services/sender";

class Main {
	public static async init(): Promise<void> {
		try {
			await DB.init();
			await KioskList.init();
			Sender.init();
			await Server.init();
			process.on("SIGINT", async () => {
				await Main.close();
			});
			await Logger.log(`Server is started`);
		} catch (err) {
			await Main.thrower(err as Error);
		}
	}

	public static async close(): Promise<void> {
		try {
			await Logger.log("Main: Program termination");
			await Server.stop();
			await DB.close();
			await Logger.log(`Server is stopped`);
		} catch (err) {
			await Main.thrower(err as Error);
		}
	}

	public static async thrower(err: Error): Promise<void> {
		try {
			await Logger.error(`Server get error: ${err.message}`);
			process.exit(1);
		} catch (err) {
			global.console.error(err);
			// tslint:disable-next-line:no-magic-numbers
			process.exit(2);
		}
	}
}

Main.init();
