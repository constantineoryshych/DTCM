import data from "./slider.json";
import SliderWrap from "./../../source/server/ts/models/sliderWrap.model";
import Slider from "./../../source/server/ts/models/slider.model";
import Slide from "./../../source/server/ts/models/slide.model";

const screenSaver = {
	file: "WYHTDN_10sec.mp4",
	path: "public/content-library/slider/holding",
	text: []
};

export default async (): Promise<void> => {
	const ss = await Slide.create(screenSaver);

	for (const element of data.slider) {
		const { key } = element;
		const slides: string[] = [];

		let i = 0;
		for (const slide of element.slides) {
			const s = await Slide.create(slide);
			slides.push(s.id);
			if (key === "holding") {
				if (i >=2) {
					slides.push(ss.id);
					i = 0;
				} else i += 1;
			}
		}
		if (key === "holding" && i > 0) slides.push(ss.id);
		const slider = await Slider.create({ key, slides });
	}

	for (const wrap of data.wrap) {
		const { key, step, stepType, screen } = wrap;

		const slider = await Slider.findOne({ key });

		await SliderWrap.create({ step, stepType, screen, slider: slider.id });
	}
};
