import each from "lodash/each";
import MainScreen from "./mainscreenSequence";
import KioskList from "~/cts/controllers/kiosk-state/kioskListClass";
import Kiosk from "~/server/models/kiosk.model";
import Sender from "./sender";
import { CustomerSession } from "./customerSession";

import { AKioskStateClass } from "~/@/kiosk.d";

class KiosksController extends KioskList {
	public async init(): Promise<void> {
		const list = await Kiosk.find({}).exec();
		super.init(list);

		each(this.list, (kiosk: AKioskStateClass) => {
			kiosk.mainScreen = new MainScreen(kiosk);
			kiosk.session = new CustomerSession(kiosk);
			new Sender(kiosk);
		});
	}
}

export default new KiosksController();
