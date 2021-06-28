import { Provider } from "bbt-provider/lib";
import KioskStateDefault from "~/cts/controllers/kiosk-state/kioskState.default";

export default new Provider({
	kiosk: KioskStateDefault("1"),
	view: {
		wait: false
	},
	form: {
		input: "",
		type: "form",
		ready: false,
		checkbox: {
			personal: false,
			terms: false
		}
	}
});
