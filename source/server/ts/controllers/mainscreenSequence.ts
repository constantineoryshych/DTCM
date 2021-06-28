import { EventEmitter } from "events";
import assign from "lodash/assign";
import SliderWrap from "~/server/models/sliderWrap.model";
import Slider from "~/server/models/slider.model";
import Slide from "~/server/models/slide.model";

import { IKioskState, Locale, StepType } from "~/@/const";
import { ISlide } from "~/@/model.d";
import { AKioskStateClass, AMainScreen, ISlider } from "~/@/kiosk.d";

class MainscreenSequenceClass extends EventEmitter implements AMainScreen {
	public slider: ISlider;

	public get slides(): ISlide[] | string[] {
		return this.slider.slides;
	}

	constructor(kiosk: AKioskStateClass) {
		super();
		kiosk.on("update", (state: IKioskState) => {
			this.collectSequence(state);
		});
		this.collectSequence(kiosk.state);
	}

	public static forDefault(lang: Locale | null | string): ISlider {
		return { slides: [], lang, step: 0, stepType: null };
	}

	private async collectSequence(kioskState: IKioskState): Promise<void> {
		const { stepType, lang, step } = kioskState;
		const CLASS = MainscreenSequenceClass;
		const screen = "mainScreen";
		try {
			const def = step === 3 ? { step, stepType, screen } : { step, screen }; //tslint:disable-line
			const wrap = await SliderWrap.findOne(def)
				.populate({
					path: "slider",
					model: "slider",
					populate: {
						path: "slides",
						model: "slide"
					}
				})
				.exec();
			if (wrap === null) throw null;

			this.slider = assign(wrap.toJSON().slider, { lang, step, stepType });
		} catch (e) {
			console.log(e);
			this.slider = CLASS.forDefault(lang);
		} finally {
			this.emit("update", this.slider);
		}
	}
}

export default MainscreenSequenceClass;
