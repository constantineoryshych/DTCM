import { Component, createElement } from "react";
import each from "lodash/each";
import startsWith from "lodash/startsWith";
import Data from "../../../controllers/data";
import { ExpPreviewView } from "./preview/expPreview";
import { PcgPreviewView } from "./preview/pcgPreview";
import { ListComposition } from "../../common/listComposition";

const _LISTS = {
	exp: {
		list: {},
		className: "exp-wrap",
		comp: ExpPreviewView
	},
	pcg: {
		list: {},
		className: "pcg-wrap",
		comp: PcgPreviewView
	}
};

export class HomeComposition extends Component {
	public render(): JSX.Element {
		this.collectLists();
		return createElement("div", { className: "home-page" }, this.getList(_LISTS.exp), this.getList(_LISTS.pcg));
	}

	private collectLists(): void {
		each(
			Data.lang.experience,
			(item: any, key: string): void => {
				if (startsWith(key, "exp")) _LISTS.exp.list[key] = item;
				if (startsWith(key, "pcg")) _LISTS.pcg.list[key] = item;
			}
		);
	}

	private getList(options: any): JSX.Element {
		return createElement(ListComposition, options);
	}
}
