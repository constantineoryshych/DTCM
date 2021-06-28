import mongoose from "mongoose";
import Config from "./config";
import Logger from "./logger";

/**
 * @namespace MongoConnector
 * @classdesc Connector to MongoDB
 */
class MongoConnector {
	/**
	 * Initialization connection to DB.
	 * Set handlers for connection events
	 *
	 * @static
	 * @async
	 * @returns {Promise<void>}
	 */
	public static async init(): Promise<void> {
		mongoose.connection.on("connected", () => {
			Logger.log(`MongoConnector: connection open`);
		});

		mongoose.connection.on("error", (err: Error) => {
			Logger.error(`MongoConnector: connection error: ${err}`);
		});

		mongoose.connection.on("disconnected", () => {
			Logger.log("MongoConnector: connection disconnected");
		});

		try {
			const { dbname, options } = Config.db;
			await mongoose.connect(`mongodb://localhost/${dbname}`, options);
		} catch (e) {
			await Logger.error(`MongoConnector: ${e}`);
		}
	}

	/**
	 * Close connection to DB
	 *
	 * @static
	 * @async
	 * @returns {Promise<void>}
	 */
	public static async close(): Promise<void> {
		await mongoose.connection.close();
		await Logger.log(
			`MongoConnector: connection disconnected through app termination`
		);
	}
}

/**
 * Static class {@link MongoConnector}
 * @exports MongoConnector
 */
export default MongoConnector;
