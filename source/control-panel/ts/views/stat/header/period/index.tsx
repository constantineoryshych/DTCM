import React, { Component, createElement } from "react";
import map from "lodash/map";
import moment from "moment";
import Provider from "./../../../../services/provider";

const _LIST = {
	month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
	year: [2018, 2019, 2020, 2021]
};

interface IPeriodProps {
	type: "month" | "year";
}

interface IState {
	selected: string | number;
}

const provider = {
	month: Provider.getChild(["period", "month"]),
	year: Provider.getChild(["period", "year"])
};

export class PeriodView extends Component<IPeriodProps, IState> {
	public state: IState = {
		selected: "-1"
	};

	private unsubscribe: () => void;

	public componentDidMount(): void {
		this.unsubscribe = provider[this.props.type].subscribe(
			(selected: string | number): void => {
				this.setState({ selected });
			}
		);
	}

	public componentWillUnmount(): void {
		this.unsubscribe();
	}

	public render(): JSX.Element {
		const { type } = this.props;
		const selected = this.state.selected === "-1" ? provider[type].get() : this.state.selected;
		return (
			<div className={type}>
				<p>Select the {type}</p>
				{/* <button>Current period</button> */}
				<select name={type} id={type} onChange={this.onChange.bind(this)} value={selected}>
					{map(_LIST[type], (value: string | number): JSX.Element => createElement("option", { value, key: value }, value))}
				</select>
			</div>
		);
	}

	private onChange(event): void {
		provider[this.props.type].set(event.target.value);
	}
}
