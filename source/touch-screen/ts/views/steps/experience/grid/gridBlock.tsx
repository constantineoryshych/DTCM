import { Component, createElement } from "react";
import Provider from "../../../../services/provider";
import Data from "../../../../controllers/data";
import { GridRow } from "./gridRow";
import { VideoView } from "./videoView";
import { LikeCounter } from "../../../common/likeCounter";

const _KIOSK_MODEL = Provider.getChild(["kiosk"]);

export interface IGridBlockProps {
	id: string;
	path: string;
}

export interface IGridBlockState {
	type: string;
	name: string;
	lang: boolean;
	size: string;
	likes: number;
	row: string[];
}

export class GridBlock extends Component<IGridBlockProps, IGridBlockState> {
	public state: IGridBlockState = {
		type: "jpg",
		name: "",
		lang: false,
		size: "",
		likes: 0,
		row: []
	};

	public componentDidMount(): void {
		Data.getGridRow(this.props.id).then(this.setState.bind(this));
	}

	public componentWillReceiveProps(): void {
		Data.getGridRow(this.props.id).then(this.setState.bind(this));
	}

	public render(): JSX.Element | null {
		if (this.state.name === "" && this.state.row.length > 0) return createElement(GridRow, this.props);
		const comp = this.getComp();
		const options = this.getOptions();
		const inner = createElement(comp, options);

		const param = {
			className: `grid-block`,
			"data-type": this.state.size || ""
		};

		const border = createElement("div", { className: "border" }, this.getLikeCounter());
		return createElement("div", param, border, inner);
	}

	private getComp(): typeof VideoView | string {
		switch (this.state.type) {
			case "jpg":
				return "img";
			case "mp4":
				return VideoView;
			default:
				return "div";
		}
	}

	private getOptions(): { src: string } {
		const { name, type, lang } = this.state;
		const sub = lang ? _KIOSK_MODEL.get().lang : "";
		const src = `${this.props.path}/${sub}/${name}.${type}`;
		return { src };
	}

	private getLikeCounter(): JSX.Element | null {
		if (this.state.lang) return null;

		const { id } = this.props;
		const { likes } = this.state;
		return createElement(LikeCounter, { likes, id });
	}
}
