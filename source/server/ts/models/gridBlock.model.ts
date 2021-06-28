// tslint:disable:no-invalid-this
import mongoose, { Schema, Model } from "mongoose";

import { IGridBlockSchema } from "~/@/model.d";

const gridBlockSchema: Schema = new mongoose.Schema(
	{
		type: {
			type: String,
			enum: ["jpg", "mp4"],
			default: "jpg"
		},
		lang: { type: Boolean, default: false },
		name: String,
		size: String,
		likes: {
			type: Number,
			default: 0
		}
	},
	{
		toJSON: {
			transform(doc: Document, ret: IGridBlockSchema): void {
				delete ret.__v;
				delete ret._id;
			}
		}
	}
);

const mGridBlock: Model<IGridBlockSchema> = mongoose.model(
	"gridBlock",
	gridBlockSchema,
	"gridBlock"
);

export default mGridBlock;
