// tslint:disable:no-invalid-this
import mongoose, { Schema, Model } from "mongoose";

import { ICustomerSessionSchema } from "~/@/model.d";
import Kiosk from "./kiosk.model";

const customerSessionSchema: Schema = new mongoose.Schema(
	{
		lang: String,
		email: String,
		dateStart: {
			type: Number
		},
		dateEnd: Number,
		status: {
			type: String,
			enum: ["success", "timer", "crash"],
			default: "timer"
		},
		kiosk: {
			type: mongoose.Schema.Types.ObjectId,
			ref: Kiosk
		}
	},
	{
		toJSON: {
			transform(doc: Document, ret: ICustomerSessionSchema): void {
				delete ret.__v;
				delete ret._id;
			}
		}
	}
);

const mCustomerSession = mongoose.model("customerSession", customerSessionSchema, "customerSession");

export default mCustomerSession as Model<ICustomerSessionSchema>;
