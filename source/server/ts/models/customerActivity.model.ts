// tslint:disable:no-invalid-this
import mongoose, { Schema, Model } from "mongoose";

import { ICustomerActivitySchema } from "~/@/model.d";
import CustomerSession from "./customerSession.model";

const customerActivitySchema: Schema = new mongoose.Schema(
	{
		event: String,
		timestamp: String,
		primary: String,
		secondary: String,
		session: {
			type: mongoose.Schema.Types.ObjectId,
			ref: CustomerSession
		}
	},
	{
		toJSON: {
			transform(doc: Document, ret: ICustomerActivitySchema): void {
				delete ret.__v;
				delete ret._id;
			}
		}
	}
);

const mCustomerActivity = mongoose.model("customerActivity", customerActivitySchema, "customerActivity");

export default mCustomerActivity as Model<ICustomerActivitySchema>;
