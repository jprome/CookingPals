import mongoose from "mongoose";
import { food_request } from "../config/interface";

const requestSchema = new mongoose.Schema({
	// 0 is no and 1 is yes
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
	weekly_budget: {
		type: Number,
		required: true,
	},
	// TODO: we need a bank for this
	location: {
		type: String,
		required: true,
	},
});

export default mongoose.model<food_request>("request", requestSchema);
