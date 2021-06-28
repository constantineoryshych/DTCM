// tslint:disable:no-invalid-this
import mongoose, { Schema, Model } from "mongoose";

import { IGridSchema } from "~/@/model.d";
import GridRow from "./gridRow.model";

const gridSchema: Schema = new mongoose.Schema(
	{
		grid: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: GridRow
		},
		path: String,
		key: String
	},
	{
		toJSON: {
			transform(doc: Document, ret: IGridSchema): void {
				delete ret.__v;
				delete ret._id;
			}
		}
	}
);

const mGrid: Model<IGridSchema> = mongoose.model(
	"grid",
	gridSchema,
	"grid"
);

export default mGrid;
