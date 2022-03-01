import mongoose from "mongoose";
import { Recipe } from "../config/interface";

const recipeSchema = new mongoose.Schema({
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
	picture: {
		type: String,
	},
});

export default mongoose.model<Recipe>("recipe", recipeSchema);
