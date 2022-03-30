import mongoose from "mongoose";
import { Cookbook } from "../config/interface";
import Recipe from "./recipeModel";

const cookbookSchema = new mongoose.Schema({
	diet_filters: {
		type: [String],
	},
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
	recipes: [Recipe.schema],
});

export default mongoose.model<Cookbook>("cookbook", cookbookSchema);
