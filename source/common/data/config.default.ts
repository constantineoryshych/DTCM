export interface IConfigDb {
	dbname: string;
	options?: {
		user: string;
		pass: string;
		
	}

}

export interface IConfigMail {
	host: string;
	port: number;
	secure: boolean;
	auth: {
		user: string;
		pass: string;
	}
}

export interface IConfig {
	port: number;
	db: IConfigDb;
	mail: IConfigMail;
}

const config: IConfig = {
	port: 3000,
	db: {
		dbname: "dtcm",
		options: {
			user: "dtcm",
			pass: "qwerty",
		},
	},
	mail: {
		host: "smtp.gmail.com",
		port: 465,
		secure: true, // -- true for 465, false for other ports
		auth: {
			user: "", // Generated ethereal user
			pass: "" // Generated ethereal password
		}
	}
};

export default config;
