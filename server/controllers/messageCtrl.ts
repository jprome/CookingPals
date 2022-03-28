import { Response } from "express";
import { IReqAuth } from "../config/interface";
import Message from "../models/messageModel";
import Chat from "../models/chatModel";
var ObjectId = require("mongodb").ObjectId;

const messageCtrl = {
	allMessages: async (req: IReqAuth, res: Response) => {
		// Validate user
		if (!req.user)
			return res.status(400).json({ msg: "Invalid Authentication." });

		try {
			// Find Messages
			const messages = await Message.find({
				chat: ObjectId(req.query.chatId),
			})
				.populate("sender", "name picture account")
				.populate("chat");

			// respond with messages
			res.json(messages);
		} catch (err: any) {
			return res.status(400).json({ msg: err.message });
		}
	},

	sendMessages: async (req: IReqAuth, res: Response) => {
		// Validate User
		if (!req.user)
			return res.status(400).json({ msg: "Invalid Authentication." });

		const { content, chatId } = req.body;

		// Check parameters
		if (!content || !chatId) {
			console.log("Invalid data passed into request");
			return res.sendStatus(400);
		}

		try {
			// create new message
			const newMessage = {
				sender: ObjectId(req.user._id),
				content: content,
				chat: ObjectId(chatId),
			};
			var message = await Message.create(newMessage);

			message = await message
				.populate("sender", "name account picture")
				.execPopulate();
			message = await message
				.populate({
					path: "chat",
					populate: { path: "users", select: "name picture account" },
				})
				.execPopulate();

			// Update lastest message for this chat
			await Chat.findByIdAndUpdate(req.body.chatId, {
				latestMessage: message._id,
			});

			res.json(message);
		} catch (err: any) {
			return res.status(400).json({ msg: err.message });
		}
	},
};

export default messageCtrl;
