import mongoose from "mongoose";
import { IUser } from "../config/interface";
import Reference from "./referenceModel";
import Cookbook from "./cookbookModel";
import Request from "./requestModel";
import friendRequestModel from "./friendRequestModel";

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
		dob: {
			type: String,
			required: [true, "Please add your date of birth"],
		},
		location: {
			type: String,
			required: [true, "Please add your current location"],
		},
		occupation: {
			type: String,
			default: "N/A",
		},
		gender: {
			type: String,
			default: "N/A",
		},
		age: {
			type: String,
			default: "N/A",
		},
		languages: {
			type: [String],
			default: "N/A",
		},

		intro: { type: String },
		friends: { type: [mongoose.Schema.Types.ObjectId], ref: "user" },
		friendRequestReceived: [friendRequestModel.schema],
		friendRequestGiven: [friendRequestModel.schema],
		groups: { type: [String] },
		picture: {
			type: String,
			default:
				// TODO: Change this default
				"https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png",
		},
		references: [Reference.schema],
		cookbook: [Cookbook.schema],
		request: Request.schema,
	},
	{
		timestamps: true,
	}
);

export default mongoose.model<IUser>("user", userSchema);
