import { appendFile, existsSync } from "fs";
import mkdirp from "mkdirp";
import moment from "moment";

class Logger {
	public static async log(data: string, processName: string | false = false): Promise<void> {
		await Logger.writeLog("log", data, processName);
	}

	public static async warn(data: string, processName: string | false = false): Promise<void> {
		await Logger.writeLog("warn", data, processName);
	}

	public static async error(data: string, processName: string | false = false): Promise<void> {
		await Logger.writeLog("error", data, processName);
	}

	public static async writeLog(type: string, data: string, processName: string | false = false): Promise<{}> {
		const d = {
			m: moment().format("MM-YYYY"),
			t: moment().format("DD/MM/YYYY HH:mm:ss")
		};
		const file = `${Logger.parsePath(processName)}/${d.m}/${type}.log`;
		const message = `\r\n ${d.t} ${data}`;

		Logger.checkDir(processName);
		return new Promise((resolve: () => void): void => {
			appendFile(file, message, (err: Error | null): void => {
				if (err !== null) throw new Error(`Logger.${type} error: ${err}`);
				resolve();
			});
		});
	}

	private static checkDir(processName: string | false = false): void {
		let dir: string = Logger.parsePath(processName);
		dir += `/${moment().format("MM-YYYY")}`;

		try {
			const exists: boolean = existsSync(dir);
			if (!exists) mkdirp.sync(dir);
		} catch (e) {
			global.console.log(e);
		}
	}

	private static parsePath(processName: string | false = false): string {
		return typeof processName === "string" ? `./log/${processName}/` : `./log/`;
	}
}

export default Logger;
