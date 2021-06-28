import { EventEmitter } from "events";
import each from "lodash/each";
import find from "lodash/find";

import { AKioskListClass, AKioskStateClass } from "~/@/kiosk.d";
import { IKioskState } from "~/@/const";
import { IKioskSchema } from "~/@/model.d";

import KioskStateClass from "./kioskStateClass";

const MAX_LISTENERS: number = 20;

/**
 * Entry point to work with Kiosks states
 * @extends EventEmitter
 */
class KioskListClass extends EventEmitter implements AKioskListClass {
	/**
	 * Contains key:value list of kiosks.
	 * ```key``` - id of the kiosk.
	 * ```value``` - instance {@link KioskStateClass}
	 * @type {Object}
	 */
	public list: { [id: string]: AKioskStateClass } = {};
	/**
	 * Docs from MongoDB.kiosk collection
	 * @type {Array}
	 * @example
	 * [
	 *   {
	 *     _id: 5a9adc7a8e666922d08df33d,
	 *     name: 'Test',
	 *     touchScreenIp: '127.0.0.1',
	 *     mainScreenIp: '127.0.0.1'
	 *     }
	 * ]
	 */
	private state: IKioskSchema[] = [];

	constructor() {
		super();
		this.setMaxListeners(MAX_LISTENERS);
	}

	/**
	 * Constructing list of kiosk
	 * Call this.emit('init');
	 * @param {Array} list - Docs from MongoDB.kiosk collection.
	 */
	public init(list: IKioskSchema[]): void {
		this.state = list;
		each(list, (val: IKioskSchema): void => {
			const kiosk: AKioskStateClass = new KioskStateClass(val.id);
			this.list[val.id] = kiosk;
			kiosk.on("update", (kioskState: IKioskState): void => {
				this.emit("kioskUpdate", kioskState);
			});
		});
		this.emit("init", this.state);
	}

	/**
	 * Get kiosk info by device ip
	 * @param {String} address - Device ip
	 * @returns {Object} Kiosk information
	 * ```json
	 * {
	 *   id: String,
	 *   name: String,
	 *   touchScreenIp: String,
	 *   mainScreenIp: String
	 * }
	 * ```
	 */
	public getKioskByIp(address: string): AKioskStateClass | false | never {
		try {
			return this.getTouchScreenByIp(address) || this.getMainScreenByIp(address);
		} catch (err) {
			throw err;
		}
	}

	/**
	 * Get kiosk info by device ip
	 * @param {String} touchScreenIp - Device ip
	 * @returns {Object} Kiosk information
	 * ```json
	 * {
	 *   id: String,
	 *   name: String,
	 *   touchScreenIp: String,
	 *   mainScreenIp: String
	 * }
	 * ```
	 */
	public getTouchScreenByIp(touchScreenIp: string): AKioskStateClass | false | never {
		try {
			const kiosk = find(this.state, { touchScreenIp });
			if (typeof kiosk === "undefined") return false;
			return this.list[kiosk.id];
		} catch (err) {
			throw err;
		}
	}

	/**
	 * Get kiosk info by device ip
	 * @param {String} mainScreenIp - Device ip
	 * @returns {Object} Kiosk information
	 * ```json
	 * {
	 *   id: String,
	 *   name: String,
	 *   touchScreenIp: String,
	 *   mainScreenIp: String
	 * }
	 * ```
	 */
	public getMainScreenByIp(mainScreenIp: string): AKioskStateClass | false | never {
		try {
			const kiosk = find(this.state, { mainScreenIp });
			if (typeof kiosk === "undefined") return false;
			return this.list[kiosk.id];
		} catch (err) {
			throw err;
		}
	}
}

/**
 * {@link KioskLisClass}
 * @exports KioskLisClass
 */
export default KioskListClass;
