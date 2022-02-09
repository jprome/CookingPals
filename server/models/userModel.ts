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
		dob: {
			type: String,
			required: [true, "Please add your date of birth"],
		},
		location: {
			type: String,
			required: [true, "Please add your current location"],
		},
		intro: { type: String },
		friends: { type: [String] },
		groups: { type: [String] },
		picture: { data: Buffer, contentType: String },
		references: [
			{
				reference_author: {
					type: String,
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
			},
		],

		// TODO: add other profile details
		// Chats : [Chats],
		// Cookbook : [Cookbook],
		// Request :  [request],
		// Request_accepted: [requst],
	},
	{
		timestamps: true,
	}
);

export default mongoose.model<IUser>("user", userSchema);
