import { readFileSync, writeFileSync } from "fs";
import clone from "lodash/clone";
import ConfigDefault, { IConfig } from "~/data/config.default";
import Logger from "./logger";

const _JSON_PRETTY = 2;

class Configurator {
	private readonly PATH: string = `./config/config.json`;
	private readonly CONFIG_DEFAULT: IConfig = clone(ConfigDefault);
	private data: IConfig;

	public get config(): IConfig {
		return this.data;
	}

	constructor() {
		this.open();
	}

	/**
	 * Open configuration file.
	 * In the event that an exception is caught, the default configuration will saved in configuration file.
	 */
	private open(): void {
		try {
			const content: string = readFileSync(this.PATH, "utf-8");
			this.data = JSON.parse(content);
			Logger.log(`ConfigController: Configuration from file is received`);
		} catch (err) {
			Logger.error(`ConfigController-open(): ${err}`);
			this.save(true);
		}
	}

	/**
	 * Save configuration into file.
	 *
	 * @param {Boolean} def - if true use default configuration else use currently configuration
	 */
	private save(def: boolean = false): void {
		const data = def ? this.CONFIG_DEFAULT : this.data;
		try {
			const content = JSON.stringify(data, null, _JSON_PRETTY);
			writeFileSync(this.PATH, content);
			Logger.log(`ConfigController: Default configuration is saved to a file`);
		} catch (err) {
			Logger.error(`ConfigController->save(): ${err}`);
		}
	}
}

const configurator = new Configurator();
const config = configurator.config;

export default config;
