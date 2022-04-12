import mongoose from "mongoose";
import { Recipe } from "../config/interface";

const recipeSchema = new mongoose.Schema({
	diet_filters: {
		type: [String],
	},
	cover_pic: {
		type: String,
	},
	content_pic: {
		type: [String],
	},
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
	ingredients: {
		type: [String],
	},
	steps: {
		type: [String],
	},
});

export default mongoose.model<Recipe>("recipe", recipeSchema);
