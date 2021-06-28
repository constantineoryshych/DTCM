import { Component, createElement } from "react";
import { Session } from "../../../controllers/session";

const PATH = `/public/content-library/gui/touch-screen`;

const OPTIONS = {
	className: "screen-saver",
	onClick: Session.startSession.bind(null),
	src: `${PATH}/DTCM-APV2-TS-ScreenSaver.mp4`,
	autoPlay: true,
	loop: true
};

export class ScreenSaverView extends Component {
	public render(): JSX.Element {
		return createElement("video", OPTIONS);
	}
}
