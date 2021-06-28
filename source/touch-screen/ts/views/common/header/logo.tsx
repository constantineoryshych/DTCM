import React, { Component } from "react";

const PATH = `/public/content-library/gui`;

export class LogoView extends Component<{ color: string }, {}> {
	public render(): JSX.Element {
		return (
			<div className="logo-wrap">
				<img src={`${PATH}/logo-${this.props.color}.png`} alt="DTCM Logo" />
			</div>
		);
	}
}
