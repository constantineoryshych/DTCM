import mongoose, { Schema, Model } from "mongoose";
import { StepType } from "~/@/const";
import Slider from "./slider.model";

import { ISliderWrapSchema, ISliderSchema } from "~/@/model.d";

const sliderWrapSchema: Schema = new mongoose.Schema(
	{
		step: Number,
		stepType: String,
		screen: {
			type: String,
			enum: ["touchScreen", "mainScreen"],
			default: "mainScreen"
		},
		slider: {
			type: mongoose.Schema.Types.ObjectId,
			ref: Slider
		}
	},
	{
		toJSON: {
			transform(doc: Document, ret: ISliderSchema): void {
				delete ret.__v;
				delete ret._id;
			}
		},
		toObject: {
			transform(doc: Document, ret: ISliderSchema): void {
				delete ret.__v;
				delete ret._id;
			}
		}
	}
);

const mSliderWrap: Model<ISliderWrapSchema> = mongoose.model("sliderWrap", sliderWrapSchema, "sliderWrap");

export default mSliderWrap;
