import { Component, createElement } from "react";
import map from "lodash/map";
import { IExperiences } from "../../controllers/data";

export interface IListProps {
	list: IExperiences;
	className: string;
	comp: any;
}

export class ListComposition extends Component<IListProps> {
	public render(): JSX.Element {
		const { className } = this.props;
		return createElement("div", { className }, this.getList());
	}

	private getList(): JSX.Element[] {
		return map(this.props.list, this.getItem.bind(this));
	}

	private getItem(item: { name: string }, key: string): JSX.Element {
		return createElement(this.props.comp, { name: key, key });
	}
}
