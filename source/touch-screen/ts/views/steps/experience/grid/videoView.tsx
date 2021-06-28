import { Component, createElement } from "react";
import VisibilitySensor from "react-visibility-sensor";

export class VideoView extends Component<{ src: string }, { play: boolean }> {
	public state: { play: boolean } = { play: false };

	public componentDidUpdate(): void {
		const video = this.refs.vid as HTMLVideoElement;
		if (this.state.play) {
			try {
				video.currentTime = 0;
				video.play();
			} catch (e) {
				//
			}
		} else video.pause();
	}

	public render(): JSX.Element {
		const param = this.getParam();
		return createElement(
			VisibilitySensor,
			param[0],
			createElement("video", param[1])
		);
	}

	private handlerVisability(isVisible: boolean): void {
		this.setState({ play: isVisible });
	}

	private getParam(): object[] {
		const { src } = this.props;
		const onChange = this.handlerVisability.bind(this);
		return [
			{
				onChange,
				scrollCheck: true
			},
			{
				src,
				loop: true,
				autoPlay: false,
				ref: "vid"
			}
		];
	}
}
