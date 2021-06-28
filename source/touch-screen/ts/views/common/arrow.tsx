import React, { Component } from "react";

const body = document.querySelector("body");

interface IScrollArrowState {
	disable: boolean;
}

interface IScrollArrowProps {
	type: "policy" | "grid";
}

export class ScrollArrow extends Component<IScrollArrowProps, IScrollArrowState> {
	public state: IScrollArrowState = {
		disable: false
	};

	private listener: () => void = this.handEvent.bind(this);

	public componentDidMount(): void {
		if (body === null) return;
		body.addEventListener("touchend", this.listener, false);
	}

	public componentWillUnmount(): void {
		if (body === null) return;
		body.removeEventListener("touchend", this.listener);
	}

	public render(): JSX.Element {
		return (
			<svg
				version="1.0"
				xmlns="http://www.w3.org/2000/svg"
				x="0px"
				y="0px"
				viewBox="0 0 90 90"
				enableBackground="new 0 0 90 90"
				className={`arrow-icon icon-color-${this.props.type === `policy` ? "white" : "blue"} ${this.state.disable ? "disable" : ""}`}
				ref="arrowIcon"
			>
				<path
					d="M86.4,45c0,22.9-18.6,41.4-41.4,41.4C22.1,86.4,3.6,67.9,3.6,45S22.1,3.6,45,3.6
				C67.9,3.6,86.4,22.1,86.4,45"
					className="icon-bg"
				/>
				<path
					d="M87.5,45h-2.5c0,11.1-4.5,21.1-11.8,28.3C66.1,80.6,56.1,85.1,45,85.1c-11.1,0-21.1-4.5-28.3-11.8
				C9.4,66.1,4.9,56.1,4.9,45s4.5-21.1,11.8-28.3C23.9,9.4,33.9,4.9,45,4.9c11.1,0,21.1,4.5,28.3,11.8c7.3,7.3,11.8,17.3,11.8,28.3
				H87.5H90C90,20.2,69.8,0,45,0C20.2,0,0,20.2,0,45c0,24.8,20.2,45,45,45c24.8,0,45-20.2,45-45H87.5z"
					className="border"
				/>
				<g className="arrow-anim" data-animator-group="true" data-animator-type="0">
					<path
						d="M71.8,37.5c0,0.8-0.3,1.5-0.9,2l-24,23.1c-1,0.9-2.5,0.9-3.5,0.1L19.1,39.7c-0.6-0.5-1-1.2-1-2.1
				c0-0.6,0.2-1.2,0.6-1.7l1.8-2.2L45,57.1l22.3-21.6l2-1.7l1.9,1.9C71.6,36.2,71.8,36.9,71.8,37.5"
					/>
				</g>
			</svg>
		);
	}

	private handEvent(): void {
		console.log("touch-end");
		if (body === null) return;
		const container = this.props.type === `policy` ? ".form-wrapper .article" : ".experience-grid";
		const containerElem = body.querySelector(container);
		if (containerElem === null || containerElem.scrollTop < 100) return;
		body.removeEventListener("touchend", this.listener);
		this.setState({ disable: true });
	}
}
