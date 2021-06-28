import * as mailer from "nodemailer";
import assign from "lodash/assign";
import Config from "./config";
import { MailOptions } from "nodemailer/lib/smtp-transport";

interface IOptions {
	from: string;
	subject: string;
}

class Sender {
	private transporter: mailer.Transporter;
	private OPTIONS: IOptions = {
		from: `MyDubai Experience – DO NOT REPLY`, // Sender address
		subject: "no-reply   -   MyDubai Experience / visitdubai.com" // Subject line
	};

	public init(): void {
		this.transporter = mailer.createTransport(Config.mail);
		this.OPTIONS.from += ` <${Config.mail.auth.user}>`;
	}

	public async verify(): Promise<{}> {
		return new Promise((res: () => void, rej: (err: Error) => void): void => {
			this.transporter.verify((err: Error): void => {
				if (err) rej(err);
				else res();
			});
		});
	}

	public async send(to: string, html: string): Promise<void | never> {
		try {
			await this.verify();

			const options = assign(this.OPTIONS, { to, html });
			await this.sendMail(options);
		} catch (err) {
			throw err;
		}
	}

	private async sendMail(options: MailOptions): Promise<{}> {
		return new Promise((res: (info: string) => void, rej: (err: Error) => void): void => {
			this.transporter.sendMail(options, (err: Error, info: string) => {
				if (err) rej(err);
				else res(info);
			});
		});
	}
}

export default new Sender();
