import { PreviewView, IPreviewProps } from "./previewView";

export class ExpPreviewView extends PreviewView {
	constructor(props: IPreviewProps) {
		super(props, {type: "exp", form: "square"});
	}
}
