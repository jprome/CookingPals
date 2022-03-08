import mongoose from "mongoose";
import { food_request } from "../config/interface";

const requestSchema = new mongoose.Schema({
	// cooking, ingreidents, and experience go from -1 to 1. -1 being no, 0 being maybe, and 1 being yes.
	give_cooking: {
		type: Number,
		required: true,
	},
	give_ingredient: {
		type: Number,
		required: true,
	},
	give_experience: {
		type: Number,
		required: true,
	},
	recieve_cooking: {
		type: Number,
		required: true,
	},
	recieve_ingredient: {
		type: Number,
		required: true,
	},
	recieve_experience: {
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
});

export default mongoose.model<food_request>("request", requestSchema);