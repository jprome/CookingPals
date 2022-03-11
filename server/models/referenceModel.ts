import mongoose from "mongoose";
import { Reference } from "../config/interface";

const referenceSchema = new mongoose.Schema({
	reference_author: {
		type: [mongoose.Schema.Types.ObjectId],
		ref: "user",
		required: true,
	},
	rating: {
		type: Number,
		max: 5,
		min: 0,
		required: true,
	},
	comment: {
		type: String,
		required: true,
	},
	date: {
		type: String,
		required: true,
	},
	picture: {
		type: String,
	},
});

export default mongoose.model<Reference>("reference", referenceSchema);
