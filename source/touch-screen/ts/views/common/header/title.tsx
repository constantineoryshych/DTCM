import { Component, createElement } from "react";
import Data from "../../../controllers/data";
import Provider from "../../../services/provider";

const _STEP_MODEL = Provider.getChild(["kiosk", "step"]);

export class TitleView extends Component<{ color: string }, {}> {
	public render(): JSX.Element {
		const options = this.getOptions();
		return createElement("h1", options[0], options[1]);
	}

	private getOptions(): any[] {
		try {
			const step = _STEP_MODEL.get();
			const className = `${this.props.color}-text`;
			const title = Data.lang.title[step] || "";
			return [{ className }, title];
		} catch (err) {
			const title = "Lang pack fields is missing";
			return [{ className: "error" }, title];
		}
	}
}
