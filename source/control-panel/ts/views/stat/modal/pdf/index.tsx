import React, { Component } from "react";
import SavePdf from "../../../../controllers/savePdf";
import provider, { PdfStatus } from "./../../../../services/provider";

const _MODEL_PDF = provider.getChild(["pdf"]);

interface IState {
	status: PdfStatus;
	drawed: string;
	ready: string;
	emails: string;
}

export class ModalPdf extends Component<{}, IState> {
	public state: IState = _MODEL_PDF.get() as IState;
	private onClick: () => void = SavePdf.save.bind(SavePdf);
	private unsubscribe: () => void;

	public componentDidMount(): void {
		this.unsubscribe = _MODEL_PDF.subscribe(
			(newState: IState): void => {
				this.setState(newState);
				console.log(newState);
			}
		);
	}

	public componentWillUnmount(): void {
		this.unsubscribe();
	}

	public render(): JSX.Element | null {
		if (this.state.status === PdfStatus.NONE) return null;

		return (
			<section className="modal pdf">
				<div className="wrap">
					<h1>{this.state.status === PdfStatus.READY ? "PDF file ready to download" : "Formation of the PDF file..."}</h1>

					{this.state.status === PdfStatus.READY
						? null
						: [
							<p key="drawed">Formed graphs: {this.state.drawed}</p>,
							<p key="ready">Filling the file: {this.state.ready}</p>,
							<p key="emails">Pages with Emails: {this.state.emails}</p>
						]}

					{this.state.status === PdfStatus.READY ? (
						<div className="button" onClick={this.onClick}>
							<p>Save</p>
						</div>
					) : null}
				</div>
			</section>
		);
	}
}
