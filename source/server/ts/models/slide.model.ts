// tslint:disable:no-invalid-this
import mongoose, { Schema, Model } from "mongoose";

import { ISlide, ISlideSchema } from "~/@/model.d";

const slideSchema: Schema = new mongoose.Schema(
	{
		file: String,
		path: String,
		text: [String],
		color: {
			type: String,
			enum: ["w", "b"],
			default: "w"
		},
		delay: {
			type: Number,
			default: 15000
		},
		sort: Number
	},
	{
		toJSON: {
			transform(doc: Document, ret: ISlideSchema): void {
				delete ret.__v;
				delete ret._id;
				ret.fullpath = `/${ret.path}/${ret.file}`;
			}
		}
	}
);

const mSlide: Model<ISlideSchema> = mongoose.model("slide", slideSchema, "slide");

slideSchema.virtual("addSort").set(function(): void {
	this.sort += 1;
});

slideSchema.virtual("fullpath").get(function(): string {
	return `./${this.path}/${this.file}`;
});

slideSchema.post("update", async function(): Promise<void> {
	const slides = await mSlide.find({ sort: { $gt: this.sort - 1 } });
	slides.forEach((slide: ISlide) => {
		slide.addSort();
	});
});

export default mSlide;
