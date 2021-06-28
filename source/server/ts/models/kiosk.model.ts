import mongoose, { Schema, Model } from "mongoose";
import { IKioskSchema } from "~/@/model.d";

const kioskSchema: Schema = new mongoose.Schema({
	name: String,
	touchScreenIp: {
		type: String,
		required: true
	},
	mainScreenIp: {
		type: String,
		required: true
	}
});

const mKiosk: Model<IKioskSchema> = mongoose.model("kiosk", kioskSchema, "kiosk");

export default mKiosk;
