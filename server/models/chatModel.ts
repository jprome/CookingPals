import mongoose from "mongoose";
import { chat } from "../config/interface";

const chatSchema = new mongoose.Schema(
	{
		chatName: { type: String, trim: true },
		isGroupChat: { type: Boolean, default: false },
		users: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
		latestMessage: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "message",
		},
		groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
	},
	{ timestamps: true }
);

export default mongoose.model<chat>("chat", chatSchema);
