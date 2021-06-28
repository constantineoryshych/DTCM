import { Provider } from "bbt-provider/lib";
import moment from "moment";

export enum GraphStatus {
	LOADING,
	READY,
	ERROR,
	INPROCESS
}

export enum PdfStatus {
	NONE,
	DRAW,
	READY,
	ERROR
}

export default new Provider({
	period: {
		month: moment().format("MMM"),
		year: moment().format("YYYY")
	},
	graphs: {
		interaction: GraphStatus.LOADING,
		language: GraphStatus.LOADING,
		interest: GraphStatus.LOADING,
		timespent: GraphStatus.LOADING,
		hourly: GraphStatus.LOADING,
		daily: GraphStatus.LOADING,
		collected: GraphStatus.LOADING,
		aborted: GraphStatus.LOADING,
		average: GraphStatus.LOADING,
		emails: GraphStatus.LOADING
	},
	pdf: {
		status: PdfStatus.NONE,
		drawed: "",
		ready: "",
		emails: ""
	}
});
