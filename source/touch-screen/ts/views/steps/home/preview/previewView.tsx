import { Component, createElement } from "react";
import { Events } from "../../../../controllers/events";
import Data from "../../../../controllers/data";

export interface IPreviewProps {
	name: string;
}

export interface IPreviewParam {
	type: "exp" | "pcg";
	form: "square" | "rect";
}

import Provider from "../../../../services/provider";


const _LANG_MODEL = Provider.getChild(["kiosk", "lang"]);

export class PreviewView extends Component<IPreviewProps> {
	private readonly path: string = `/public/content-library/experiences/${this.props.name}`;
	private readonly param: IPreviewParam;

	constructor(props: IPreviewProps, param: IPreviewParam) {
		super(props);
		this.param = param || {
			type: "exp",
			form: "square"
		};
	}

	public render(): JSX.Element {
		return createElement("div", this.getOptions(), this.getPreview());
	}

	private getOptions(): { className: string; onClick: Function } {
		return {
			className: `${this.param.type}-preview`,
			onClick: Events.expView.bind(null, this.props.name)
		};
	}

	private getPreview(): JSX.Element[] {
		return (this.param.type === "pcg") ? [this.getPcgBg(), this.getPcgInfo()] : [this.getBg(), this.getInfo()];
	}

	private getBg(): JSX.Element {
		return createElement(
			"div",
			{ className: `${this.param.type}-bg`, key: "bg" },
			createElement("div", null),
			createElement("img", {
				src: `${this.path}/preview-${this.param.form}.jpg`
			})
		);
	}

	private getIcon(): JSX.Element {
		return createElement("img", { src: `${this.path}/icon.png`, key: "icon" });
	}

	private getInfo(): JSX.Element {
		const { name } = Data.lang.experience[this.props.name];
		let lineBreakclassName = "";
		const header = createElement("h5", { key: "header" }, name);
		const content = [this.getIcon(), header];

		return createElement("div", { className: ("info " + lineBreakclassName), key: "info" }, content);
	}

	private getPcgBg(): JSX.Element {
		return createElement(
			"div",
			{ className: `${this.param.type}-bg`, key: "bg" },
			createElement("div", null),
			createElement("img", {
				src: `${this.path}/preview/${_LANG_MODEL.get()}/button-${this.param.form}.jpg`
			})
		);
	}

	private getPcgInfo(): JSX.Element {
		return createElement("div", { className: ("info "), key: "info" }, [null]);
	}
}
