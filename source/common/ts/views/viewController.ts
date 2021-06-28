import * as React from "react";
import { render } from "react-dom";

class ViewController {
	constructor(indexView: React.ComponentClass, props?: React.Attributes | null | undefined) {
		const comp = React.createElement(indexView, props);
		const cont: HTMLElement | null = document.getElementById("container");
		render(comp, cont);
	}
}

export default ViewController;
