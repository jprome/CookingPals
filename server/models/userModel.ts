import mongoose from "mongoose";
import { IUser } from "../config/interface";
import Reference from "./referenceModel";
import Cookbook from "./cookbookModel";

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
		picture: {
			type: String,
			default:
				// TODO: Change this default
				"https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png",
		},
		references: [Reference.schema],
		cookbook: [Cookbook.schema],

		// TODO: add other profile details
		// Chats : [Chats],
		// friendrequest [id, status ]
		// Request :  [request],
		// Request_accepted: [requst],
	},
	{
		timestamps: true,
	}
);

export default mongoose.model<IUser>("user", userSchema);
