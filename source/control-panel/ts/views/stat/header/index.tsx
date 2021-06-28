import React, { Component } from "react";
import PDF from "./../../../controllers/savePdf";
import { PeriodView } from "./period/index";

export class StatHeader extends Component {
	public async printDocument(): Promise<void> {
		await PDF.printDocument();
	}

	public render(): JSX.Element {
		return (
			<div className="home-header">
				<div className="left">
					<PeriodView type="month" />
					<PeriodView type="year" />
				</div>

				<div className="center">
					<button className="all-pdf" onClick={this.printDocument.bind(this)}>
						Save to PDF
					</button>
				</div>

				<div className="right">
					{/* <p>Selected Tables</p>
					<div>5</div> */}
					<button className="select-pdf">Save to CVS</button>
				</div>
			</div>
		);
	}
}
