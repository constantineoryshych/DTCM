import React, { Component, createElement } from "react";
import assign from "lodash/assign";
import map from "lodash/map";
import { StatHeader } from "./header";
import { ChartView, IChartProps } from "./chart";
import _DATA from "~/data/charts/options";

export class StatComposition extends Component {
	public render(): JSX.Element {
		return (
			<article>
				<StatHeader />
				<aside className="home-main" id="main">
					{map(_DATA, (elem: IChartProps, key: number) => createElement(ChartView, assign(elem, { key })))}
				</aside>
			</article>
		);
	}
}
