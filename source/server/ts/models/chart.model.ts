// tslint:disable:no-invalid-this
import mongoose, { Schema, Model } from "mongoose";

import { IGraphSchema } from "~/@/model.d";

const graphSchema: Schema = new mongoose.Schema(
	{
		type: {
			type: String,
			required: true
		},
		period: {
			type: String,
			required: true
		},
		periodEnded: {
			type: Boolean,
			required: true
		},
		collected: Date,
		data: [{
			type: Array,
			required: true
		}]
	},
	{
		toJSON: {
			transform(doc: Document, ret: IGraphSchema): void {
				delete ret.__v;
				delete ret._id;
			}
		}
	}
);

graphSchema.pre("save", function(this: IGraphSchema, next: () => void): void {
	this.collected = new Date();
	next();
});

export default mongoose.model<IGraphSchema>("graph", graphSchema) as Model<IGraphSchema>;
