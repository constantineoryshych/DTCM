import jspdf from "jspdf";
import html2canvas from "html2canvas";
import { createElement } from "react";
import { render } from "react-dom";
import _DATA from "~/data/charts/options-pdf";
import { ChartView, IChartProps } from "./../views/stat/chart";
import provider, { PdfStatus } from "./../services/provider";

const _MODEL_STATUS = provider.getChild(["pdf", "status"]);
const _MODEL_DRAWED = provider.getChild(["pdf", "drawed"]);
const _MODEL_READY = provider.getChild(["pdf", "ready"]);
const _MODEL_EMAILS = provider.getChild(["pdf", "emails"]);

class SavePDF {
	private pdf: jspdf;

	public async printDocument(): Promise<void> {
		_MODEL_STATUS.set(PdfStatus.DRAW);

		const elem = document.getElementById("pdf");

		if (!elem) return;

		let drawed = 0;
		let index = 0;
		this.pdf = undefined;

		for (const item of _DATA as IChartProps[]) {
			const block = document.createElement("div");
			block.className = "block";

			elem.appendChild(block);
			await this.drawBlock(item, block)
				.then(
					(): Promise<{}> =>
						new Promise(
							(resolve: () => void): void => {
								_MODEL_DRAWED.set(`${++drawed}/${_DATA.length}`);
								if (!block) return;
								setTimeout(() => {
									resolve();
								}, 10);
							}
						)
				)
				.then(
					async (): Promise<{}> =>
						new Promise(
							async (resolve: () => void): Promise<void> => {
								if (item.options.graph_id === "emails") {
									const eblocks = block.getElementsByClassName("block");

									const eblockList = Array.from(eblocks);
									let key = 0;
									for (const eblock of eblockList) {
										await this.snapBlock(eblock as HTMLElement);
										_MODEL_EMAILS.set(`${++key}/${Array.from(eblocks).length}`);
										if (key === Array.from(eblocks).length) resolve();
									}
								} else {
									await this.snapBlock(block);
									resolve();
								}
							}
						)
				)
				.then(
					(): Promise<{}> =>
						new Promise(
							(resolve: () => void): void => {
								if (_DATA.length <= ++index) _MODEL_STATUS.set(PdfStatus.READY);
								_MODEL_READY.set(`${index}/${_DATA.length}`);
								setTimeout(() => {
									elem.removeChild(block);
									resolve();
								}, 10);
							}
						)
				)
				.catch((err: Error) => {
					console.log(err.message);
					_MODEL_STATUS.set(PdfStatus.ERROR);
				});
		}
	}

	public save(): void {
		if (!this.pdf) return;
		this.pdf.save();
		_MODEL_STATUS.set(PdfStatus.NONE);
	}

	private async snapBlock(block: HTMLElement): Promise<void> {
		const canvas = await html2canvas(block, { width: 3525, height: 2475, logging: false });
		const imgData = canvas.toDataURL("image/JPEG");
		const [w, h] = [(canvas.width * 72) / 96, (canvas.height * 72) / 96];
		if (!this.pdf) this.pdf = new jspdf("l", "pt", [w, h]);

		this.pdf.addImage(imgData, "JPEG", 10, 10, w, h);
		this.pdf.addPage();
	}

	private async drawBlock(item: IChartProps, block: HTMLElement): Promise<{}> {
		return new Promise(
			(resolve: () => void): void => {
				const props = item;
				props.options.chartEvents = [
					{
						eventName: "ready",
						callback: resolve
					}
				];
				const comp = createElement(ChartView, props);
				render(comp, block);
			}
		);
	}
}

export default new SavePDF();
