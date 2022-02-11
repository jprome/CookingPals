import mongoose from "mongoose";
import { Cookbook } from "../config/interface";
import Recipe from "./recipeModel";

const cookbookSchema = new mongoose.Schema({
	diet_filters: {
		type: [String],
	},

	name: {
		type: String,
		required: true,
	},
	recipes: [Recipe.schema],
});

export default mongoose.model<Cookbook>("cookbook", cookbookSchema);
