import { Component, createElement } from "react";
import Provider from "../../services/provider";
import { HeaderComposition } from "../common/header";
import { ScreenSaverView } from "./screen-saver";
import { WelcomeComposition } from "./welcome";
import { HomeComposition } from "./home";
import { ExperienceComposition } from "./experience";
import { SubscribeComposition } from "./subscribe";
import { ThankYouComposition } from "./thank-you";

const STEPS = [
	ScreenSaverView,
	WelcomeComposition,
	HomeComposition,
	ExperienceComposition,
	SubscribeComposition,
	ThankYouComposition
];

const STEP_MODEL = Provider.getChild(["kiosk", "step"]);
const WAIT_MODEL = Provider.getChild(["view", "wait"]);

export class StepsComposition extends Component {
	public state: { step: number } = {
		step: STEP_MODEL.get()
	};

	private unsubscribe: Function;

	public componentDidMount(): void {
		this.unsubscribe = STEP_MODEL.subscribe(
			(step: number): void => {
				if (this.state.step === step) return;

				const unsubscribe = WAIT_MODEL.subscribe((open: boolean) => {
					if (open) return;
					unsubscribe();
					this.setState({ step });
				});
			}
		);
	}

	public componentWillUnmount(): void {
		this.unsubscribe();
	}

	public render(): (JSX.Element | null)[] {
		// console.log("render", this.state.step, STEP_MODEL.listenerCount)
		return [
			this.getHeader(),
			createElement(STEPS[this.state.step], { key: "step" })
		];
	}

	private getHeader(): JSX.Element | null {
		return this.state.step > 1
			? createElement(HeaderComposition, { key: "header" })
			: null;
	}
}
