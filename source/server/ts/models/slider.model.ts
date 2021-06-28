import mongoose, { Schema, Model } from "mongoose";
import { StepType } from "~/@/const";
import Slide from "./slide.model";

import { ISliderSchema, ISlideSchema } from "~/@/model.d";

const sliderSchema: Schema = new mongoose.Schema(
	{
		key: String,
		slides: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: Slide
		}
	},
	{
		toJSON: {
			transform(doc: Document, ret: ISlideSchema): void {
				delete ret.__v;
				delete ret._id;
			}
		},
		toObject: {
			transform(doc: Document, ret: ISlideSchema): void {
				delete ret.__v;
				delete ret._id;
			}
		}
	}
);

const mSlider: Model<ISliderSchema> = mongoose.model("slider", sliderSchema, "slider");

export default mSlider;
