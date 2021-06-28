import React, { Component } from "react";
import { StatComposition } from "./stat";
import { ModalPdf } from "./stat/modal/pdf";

export class IndexComposition extends Component {
	public render(): JSX.Element[] {
		return [<StatComposition key="main" />, <ModalPdf key="modal" />];
	}
}
