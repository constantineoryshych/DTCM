import { Component, createElement } from "react";
import map from "lodash/map";
import { GridBlock } from "./gridBlock";
import Data from "../../../../controllers/data";

export interface IGridRowState {
	row: string[];
	column: boolean;
	reverse: boolean;
}

export interface IGridRowProps {
	id: string;
	path: string;
}

export class GridRow extends Component<IGridRowProps, IGridRowState> {
	public state: IGridRowState = {
		row: [],
		column: false,
		reverse: false
	};

	public componentDidMount(): void {
		Data.getGridRow(this.props.id).then(this.setState.bind(this));
	}

	public componentWillReceiveProps(): void {
		Data.getGridRow(this.props.id).then(this.setState.bind(this));
	}

	public render(): JSX.Element | null {
		if (this.state.row.length < 1) return null;
		const options = this.getOptions();
		const inner = this.getRow();
		// const inner = createElement("div");
		return createElement("div", options, inner);
	}

	private getOptions(): { className: string } {
		const { reverse, column } = this.state;
		const r = reverse ? " reverse" : "";
		const c = column ? ` column` : " row";
		return {
			className: `grid-row${r}${c}`
		};
	}

	private getRow(): string[] {
		return map(this.state.row, this.getItem.bind(this));
	}

	private getItem(id: string, key: string): JSX.Element {
		const { path } = this.props;
		return createElement(GridBlock, { id, path, key });
	}
}
