// tslint:disable:no-invalid-this
import mongoose, { Schema, Model } from "mongoose";

import { IGridRowSchema } from "~/@/model.d";
import GridBlock from "./gridBlock.model";

const gridRowSchema: Schema = new mongoose.Schema(
	{
		row: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: GridBlock,
			autopopulate: true
		},
		column: { type: Boolean, default: false },
		reverse: { type: Boolean, default: false }
	},
	{
		toJSON: {
			transform(doc: Document, ret: IGridRowSchema): void {
				delete ret.__v;
				delete ret._id;
			}
		}
	}
);

const mGridRow: Model<IGridRowSchema> = mongoose.model(
	"gridRow",
	gridRowSchema,
	"gridRow"
);

export default mGridRow;
