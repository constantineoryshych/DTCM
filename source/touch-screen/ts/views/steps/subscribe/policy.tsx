import { Component, createElement } from "react";
// import { MarkdownView } from "~/cts/views/markdown";
import { ScrollArrow } from "../../common/arrow";
import Provider from "../../../services/provider";

const TYPE_MODEL = Provider.getChild(["form", "type"]);
const LANG_MODEL = Provider.getChild(["kiosk", "lang"]);

const PATH = `/public/content-library/data/`;
export class PolicyView extends Component {
	public render(): JSX.Element[] {
		return [this.getArticle(), this.getButton(), createElement(ScrollArrow, { type: "policy" })];
		// return [this.getArticle(), this.getButton()];
	}

	private getArticle(): JSX.Element {
		const lang = LANG_MODEL.get().toString();
		const mdUrl = `${PATH}${lang}/privacy-policy.png`;
		// return createElement(MarkdownView, { mdUrl });
		return createElement("div", { className: "article" }, createElement("img", { src: mdUrl }));
	}
	
	private getButton(): JSX.Element {
		const param = {
			className: "close-policy",
			onClick: TYPE_MODEL.set.bind(TYPE_MODEL, "form")
		};

		return createElement("div", param);
	}
	
}
