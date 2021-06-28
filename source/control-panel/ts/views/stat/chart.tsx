import React, { Component, createElement, ReactInstance } from "react";
import { Chart } from "react-google-charts";
import chunk from "lodash/chunk";
import map from "lodash/map";
import cloneDeep from "lodash/cloneDeep";
import Provider, { GraphStatus } from "./../../services/provider";
import { GraphLoad } from "../../controllers/graphLoad";

export interface IChartProps {
	h1: string;
	desc: string;
	options: {
		graph_id: string;
		chartType: string;
		data?: (string | number)[][];
		options: { [key: string]: any; fontSize?: number; fontName?: string };
		width: string;
		height: string;
		chartEvents?: { eventName: string; callback(chartWrapper: any): void }[];
	};
	pdf?: boolean;
}

type T = string | number;
export interface IChartState {
	data: T[][];
}

const _PERIOD_MODEL = Provider.getChild("period");

export class ChartView extends Component<IChartProps, IChartState> {
	public state: IChartState = {
		data: [["", ""]]
	};

	private ref: string = `chart-${this.props.options.graph_id}`;
	private unsubscribe: () => void;

	public componentDidMount(): void {
		const c = Provider.getChild(["graphs", this.props.options.graph_id]);
		this.unsubscribe = c.subscribe(this.getData.bind(this));
		this.getData();
	}

	public componentWillUnmount(): void {
		this.unsubscribe();
	}

	public render(): JSX.Element | JSX.Element[] | null {
		const { month, year } = _PERIOD_MODEL.get();
		console.log(Provider.getChild(["graphs", this.props.options.graph_id]).get());

		if (Provider.getChild(["graphs", this.props.options.graph_id]).get() === GraphStatus.LOADING)
			return null;

		if (Provider.getChild(["graphs", this.props.options.graph_id]).get() === GraphStatus.INPROCESS)
			return (
				<div className="block">
					<div className="head">
						<div>
							<h1>{this.props.h1}</h1>
							<h3>{this.props.desc}</h3>
						</div>
						<button>{`${month} ${year}`}</button>
					</div>
					<div className="in-progress">
						<p>In Progress...</p>
						<p>Please try again in a few minutes.</p>
					</div>
				</div>
			);

		this.props.options.data = this.state.data;

		if (this.props.options.graph_id === "emails") {
			const chunks = chunk(this.state.data, 48);
			return map(
				chunks,
				(list: [string, string][], key: number): JSX.Element => (
					<div className="block" key={key}>
						<div className="head">
							<div>
								<h1>{this.props.h1}</h1>
								<h3>{this.props.desc}</h3>
							</div>
							<button>{`${month} ${year}`}</button>
						</div>
						{this.emailList(list)}
					</div>
				)
			);
		} else {
			const props = cloneDeep(this.props.options);
			if (this.props.pdf) props.graph_id = props.graph_id + "pdf";

			return (
				<div className="block">
					<div className="head">
						<div>
							<h1>{this.props.h1}</h1>
							<h3>{this.props.desc}</h3>
						</div>
						<button>{`${month} ${year}`}</button>
					</div>
					{createElement(Chart, { ref: this.ref, ...props })}
				</div>
			);
		}
	}

	private emailList(data: [string, string][]): JSX.Element {
		setTimeout(() => {
			if (this.props.options.chartEvents) {
				this.props.options.chartEvents[0].callback("ready");
			}
		}, 100);
		return (
			<div className="email-list">
				{map(
					data,
					(session: [string, string], key: number): JSX.Element => (
						<div className="row" key={key}>
							<div>{session[0]}</div>
							<div>{session[1]}</div>
						</div>
					)
				)}
			</div>
		);
	}

	private getData(): void {
		const data = GraphLoad.getData(this.props.options.graph_id);
		this.setState({ data });
	}
}
