import mongoose from "mongoose";
import { friendRequest } from "../config/interface";

const friendRequestSchema = new mongoose.Schema(
	{
		userRequest: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
		userRecipient: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
		status: {
			// 1 request, 2 accepted, 3 rejected
			type: Number,
			required: true,
		},
	},

	{ timestamps: true }
);

export default mongoose.model<friendRequest>(
	"friendRequest",
	friendRequestSchema
);
