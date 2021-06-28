import clone from "lodash/clone";
import { IKioskState, Locale } from "~/@/const";

/**
 * Returns object of the default kiosk state
 * @namespace KioskStateDefault
 * @param {String} id - Identificator of the kiosk
 * @returns {Object} Default kiosk state
 */
export default (id: string): IKioskState =>
	clone({
		id,
		step: 1,
		lang: Locale[0],
		stepType: null,
		timeStart: null,
		timeEnd: null,
		email: ""
	});
