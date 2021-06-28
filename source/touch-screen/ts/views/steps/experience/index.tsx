import { Component, createElement } from "react";
import Data from "../../../controllers/data";
import Provider from "../../../services/provider";
import { GridConstructor } from "./grid";
import { ScrollArrow } from "../../common/arrow";

const _KIOSK_MODEL = Provider.getChild(["kiosk"]);

export class ExperienceComposition extends Component {
	public render(): JSX.Element {
		const { stepType } = _KIOSK_MODEL.get();
		const className = `experience-grid ${stepType}`;
		return createElement("div", { className }, this.getGrid(), createElement(ScrollArrow));
	}

	private getGrid(): JSX.Element {
		const { grid } = Data;
		const { stepType } = _KIOSK_MODEL.get();
		const path = `\\public\\content-library\\experiences\\${stepType}\\grid\\`;
		return createElement(GridConstructor, { grid, path });
	}
}
