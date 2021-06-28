import { Component, createElement } from "react";
import map from "lodash/map";
import { GridRow } from "./gridRow";

export interface IGridProps {
	grid: object;
	path: string;
}

export class GridConstructor extends Component<IGridProps, {}> {
	public render(): JSX.Element {
		const grid: JSX.Element[] = map(this.props.grid, this.getRow.bind(this));
		return createElement("div", null, grid);
		// return createElement("div", null, this.props.path);
	}

	private getRow(id: string, key: string): JSX.Element {
		const { path } = this.props;
		return createElement(GridRow, { id, path, key });
		// return createElement("div", null, item);
	}
}
