import mongoose from "mongoose";
import slider from "./slider/slider.migrate";
import grid from "./grid/grid.migrate";

const start = async (): Promise<void> => {
	await mongoose.connect(`mongodb://localhost/dtcm`);
};

const stop = async (): Promise<void> => {
	await mongoose.disconnect();
};

start()
	.then(slider)
	.then(grid)
	.catch(console.error)
	.then(stop);
