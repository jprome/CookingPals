import mongoose from "mongoose";
import { food_request } from "../config/interface";

const requestSchema = new mongoose.Schema({
	// cooking, ingreidents, and experience go from -1 to 1. -1 being no, 0 being maybe, and 1 being yes.
	cooking: {
		type: Number,
		required: true,
	},
	ingredient: {
		type: Number,
		required: true,
	},
	experience: {
		type: Number,
		required: true,
	},
	description: {
		type: String,
	},
	// TODO: need to make a bank for this
	diets: {
		type: [String],
	},
	active: {
		type: Boolean,
		required: true,
	},
	budget: {
		type: Number,
		required: true,
	},
});

export default mongoose.model<food_request>("request", requestSchema);
