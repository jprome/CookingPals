import mongoose from "mongoose";
import { message } from "../config/interface";

const messageSchema = new mongoose.Schema(
	{
		sender: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
		content: { type: String, trim: true },
		chat: { type: mongoose.Schema.Types.ObjectId, ref: "chat" },
		readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
	},
	{ timestamps: true }
);

export default mongoose.model<message>("message", messageSchema);
