import { PreviewView, IPreviewProps } from "./previewView";

export class PcgPreviewView extends PreviewView {
	constructor(props: IPreviewProps) {
		super(props, { type: "pcg", form: "rect" });
	}
}
