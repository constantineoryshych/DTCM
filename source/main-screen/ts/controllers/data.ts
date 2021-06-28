import axios from "axios";
import { Locale } from "~/data/const";

class DataController {
	private data: object;

	public async getData(lang: string): Promise<void> {
		try {
			const url = `/api/locale/${lang}/ms`;
			const responseType = "json";
			const res = await axios({ method: "get", url, responseType });
			this.data = res.data;
			if (typeof this.data === undefined) global.console.error("Language pack not received");
		} catch (err) {
			console.log(err);
			global.console.error("Language pack not received");
		}
	}

	public getField(field: string): string {
		try {
			return this.data[field];
		} catch (err) {
			return "";
		}
	}
}

export default new DataController();
