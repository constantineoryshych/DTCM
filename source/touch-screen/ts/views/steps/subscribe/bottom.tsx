import { Component, createElement } from "react";
import { FormController } from "../../../controllers/form";
import { Events } from "../../../controllers/events";
import Provider from "../../../services/provider";
import { ButtonView } from "../../common/buttonView";

const TYPE_MODEL = Provider.getChild(["form", "type"]);
const READY_MODEL = Provider.getChild(["form", "ready"]);

interface IBottomProps {
	type: "form" | "policy";
}

interface IBottomState {
	ready: boolean;
}

export class BottomComposition extends Component<IBottomProps, IBottomState> {
	public state: IBottomState = { ready: READY_MODEL.get() };
	private unsubscribe: () => void;

	public componentDidMount(): void {
		this.unsubscribe = READY_MODEL.subscribe(this.update.bind(this));
	}

	public componentWillUnmount(): void {
		this.unsubscribe();
	}

	public render(): JSX.Element {
		return createElement("div", { className: "form-bottom" }, this.getInner());
	}

	private update(ready: boolean): void {
		this.setState({ ready });
	}

	private toogleType(): void {
		const newState = this.props.type === "form" ? "policy" : "form";
		TYPE_MODEL.set(newState);
	}

	private goNext(): void {
		FormController.send();
	}

	private getInner(): JSX.Element[] {
		return [
			createElement(ButtonView, {
				key: "p",
				type: "policy",
				onClick: this.toogleType.bind(this)
			}),
			createElement(ButtonView, {
				key: "d",
				type: "done",
				onClick: this.goNext.bind(this),
				disable: !this.state.ready
			})
		];
	}
}