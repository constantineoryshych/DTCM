import axios from "axios";

const DEFAULT_OPTIONS = {
	method: "get",
	url: "REQUIRED ARGUMENT",
	responseType: "json"
};

export class Request {
	public static async get(url: string): Promise<object | never> {
		DEFAULT_OPTIONS.url = url;
		const response = await axios(DEFAULT_OPTIONS);
		return response.data;
	}
}
