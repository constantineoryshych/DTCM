import { Component, createElement } from "react";
import { Session } from "../../controllers/session";

export interface ILikeCounterProps {
	id: string;
	likes: number;
}

export interface ILikeCounterState {
	isLiked: boolean;
}

export class LikeCounter extends Component<ILikeCounterProps, ILikeCounterState> {
	public state: ILikeCounterState = {
		isLiked: Session.isLiked(this.props.id)
	};

	public render(): JSX.Element | null {
		const { isLiked } = this.state;
		let className = "like-counter";
		className += isLiked ? " liked" : "";
		const onClick = this.like.bind(this);
		const ref = "like";
		return createElement("div", { className, onClick, ref }, isLiked ? `+1` : this.props.likes);
	}

	private like(): void {
		const { isLiked } = this.state;
		if (isLiked) Session.unLike(this.props.id);
		else Session.like(this.props.id);
		this.setState({ isLiked: Session.isLiked(this.props.id) });
	}
}
