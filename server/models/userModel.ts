import mongoose from "mongoose";
import { IUser } from "../config/interface";

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Please add your name"],
			trim: true,
		},
		account: {
			type: String,
			required: [true, "Please add your email or phone"],
			trim: true,
			unique: true,
		},
		password: {
			type: String,
			required: [true, "Please add your password"],
		},
		role: {
			type: String,
			default: "user", // admin
		},
		type: {
			type: String,
			default: "register", // login
		},
		location: { type: String },
		intro: { type: String },
		friends: { type: [String] },
		groups: { type: [String] },
		// TODO: add other profile details
		// user_pic: [string]?
		// Chats : [Chats],
		// Cookbook : [Cookbook],
		// Request :  [request],
		// References: [References],
		// Request_accepted: [requst],
	},
	{
		timestamps: true,
	}
);

export default mongoose.model<IUser>("user", userSchema);
