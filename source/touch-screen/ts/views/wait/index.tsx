import React, { Component } from "react";
import Provider from "../../services/provider";

const WAIT_MODEL = Provider.getChild(["view", "wait"]);

interface IWaitState {
	open: boolean;
	className: string;
}

const _ANIMATION_DELAY = 800;

export class WaitScreen extends Component<{}, IWaitState> {
	public state: IWaitState = {
		open: WAIT_MODEL.get(),
		className: this.getClassName()
	};

	private unsubscribe: Function;
	private anim: boolean = false;
	private timer: any = null;

	public componentDidMount(): void {
		this.unsubscribe = WAIT_MODEL.subscribe(
			(open: boolean): void => {
				const className = this.getClassName();
				clearTimeout(this.timer);
				if (open)
					this.timer = setTimeout(() => {
						this.setState({ open, className });
						this.anim = true;
					}, _ANIMATION_DELAY);
				else {
					if (!this.anim) return this.setState({ open });
					this.timer = setTimeout(() => {
						this.setState({ className });
						setTimeout(() => {
							this.setState({ open });
						}, _ANIMATION_DELAY);
					}, _ANIMATION_DELAY * 2);
				}
			}
		);
	}

	public componentWillUnmount(): void {
		this.unsubscribe();
	}

	public render(): JSX.Element | null {
		return this.state.open ? this.getInner() : null;
	}

	private getInner(): JSX.Element {
		return (
			<section className={this.state.className}>
				<div />
				<div>
					<h1>WIN</h1>
				</div>
				<div>
					<h1>YOUR HOLIDAY</h1>
				</div>
				<div>
					<h1>TO DUBAI NOW</h1>
				</div>
				<div>
					<img src="/public/content-library/gui/touch-screen/icon/tail-spin.svg" alt="Loading..." />
				</div>
			</section>
		);
	}

	private getClassName(): string {
		return WAIT_MODEL.get() ? "wait in" : "wait out";
	}
}
