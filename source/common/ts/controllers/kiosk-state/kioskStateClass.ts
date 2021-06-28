import { EventEmitter } from "events";
import assign from "lodash/assign";
import defaultState from "./kioskState.default";

import { IKioskState } from "~/@/const";
import { AKioskStateClass, AMainScreen } from "~/@/kiosk.d";

const MAX_LISTENERS: number = 20;
/**
 * Kiosk state controller
 * @extends EventEmitter
 */
class KioskStateClass extends EventEmitter implements AKioskStateClass {
	/**
	 * Using object like {@link KioskStateDefault}
	 * @type {Object}
	 * @default {}
	 * @example
	 * {
	 * 	id,
	 * 	step: 0,
	 * 	lang: "en",
	 * 	stepType: null,
	 * 	timeStart: null,
	 * 	timeEnd: null,
	 * 	email: null
	 * }
	 */
	public state: IKioskState;
	public mainScreen?: AMainScreen;

	/**
	 * @constructor
	 * @param {String} id - Identificator of the kiosk
	 */
	constructor(id: string) {
		super();
		this.state = defaultState(id);
		this.setMaxListeners(MAX_LISTENERS);
	}

	/**
	 * Assign new state data with current kiosk state.
	 * Call this.emit('update');
	 * @param {Object} newState - Using object like {@link KioskStateDefault}
	 */
	public update(newState: object): void {
		assign(this.state, newState);
		this.emit("update", this.state);
	}

	/**
	 * Reset kiosk state to default.
	 * Call this.emit('update');
	 */
	public reset(): void {
		this.state = defaultState(this.state.id);
		this.emit("update", this.state);
	}
}

/**
 * {@link KioskStateClass}
 * @exports KioskStateClass
 */
export default KioskStateClass;
