import { resolve } from "path";
import { readFileSync } from "fs";
import each from "lodash/each";
import cloneDeep from "lodash/cloneDeep";
import get from "lodash/get";
import pug from "pug";
import juice from "juice";
import sass from "node-sass";

const _TEMPLATE = resolve("./public/content-library/email-template/template.pug");
const _STYLE = resolve(`./public/content-library/email-template/style/main.sass`);
const _TEMP_IMG = resolve(`./public/content-library/email-template/data/tempImg.json`);
const _LAYOUT = resolve(`./public/content-library/email-template/data/layout.json`);

interface IDay {
	blocks: IBlock[];
}
interface IBlock {
	cover: string;
	title: string;
	desc: string;
}

class TemplateConstructor {
	public static get(lang: string, tours: [string, string]): string {
		const self = TemplateConstructor;
		const data = self.getData(lang, tours);
		const style = self.getStyle();
		const [layout, locale, tmpImg] = data;
		const template = self.getTemplate(lang, layout, locale, tmpImg, style);
		return template;
	}

	public static getStyle(): string {
		const cssBuffer = sass.renderSync({ file: _STYLE });
		return cssBuffer.css.toString();
	}

	public static getData(lang: string, tours: [string, string]): [object, object, object] {
		const data = readFileSync(resolve(`./public/content-library/data/${lang}/mail.json`), "utf-8");
		const locale = JSON.parse(data);

		const conten = readFileSync(_LAYOUT, "utf-8");
		const content = JSON.parse(conten);

		const one = {
			days: [
				cloneDeep(content[tours[0]].days[0]),
				cloneDeep(content[tours[1]].days[1])
			]
		};

		each(one.days, (day: IDay, cnt: number) => {
			each(day.blocks, (block: IBlock, blockCnt: number) => {
				block.title = get(locale, block.title);
				block.cover = `${block.cover}`;
				block.desc = get(locale[tours[cnt]], `day${cnt}.block${blockCnt}`);
			});
		});

		const { header, footer, site } = content;

		const image = readFileSync(_TEMP_IMG, "utf-8");
		const tmpImg = JSON.parse(image);

		return [Object.assign(one, { header, footer, site }), locale, tmpImg];
	}

	public static getTemplate(lang: string, layout: object, locale: object, tmpImg: object, style: string): string {
		const html = pug.renderFile(_TEMPLATE, { lang, locale, layout, style, tmpImg });
		return juice(html);
	}
}

export default TemplateConstructor;
