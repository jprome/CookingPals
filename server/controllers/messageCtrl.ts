import { Request, Response } from "express";
import { IReqAuth } from "../config/interface";
import Message from "../models/messageModel";
import Chat from "../models/chatModel";

import mongoose from "mongoose";
var ObjectId = require("mongodb").ObjectId;

const messageCtrl = {
	allMessages: async (req: IReqAuth, res: Response) => {
		if (!req.user)
			return res.status(400).json({ msg: "Invalid Authentication." });

		try {
			const messages = await Message.find({
				chat: ObjectId(req.query.chatId),
			})
				.populate("sender", "name picture account")
				.populate("chat");
			res.json(messages);
		} catch (err: any) {
			return res.status(400).json({ msg: err.message });
		}
	},

	sendMessages: async (req: IReqAuth, res: Response) => {
		if (!req.user)
			return res.status(400).json({ msg: "Invalid Authentication." });

		const { content, chatId } = req.body;

		if (!content || !chatId) {
			console.log("Invalid data passed into request");
			return res.sendStatus(400);
		}

		const newMessage = {
			sender: req.user._id,
			content: content,
			chat: chatId,
		};

		try {
			var message = await Message.create(newMessage);

			message = await message.populate("sender", "name picture").execPopulate();
			message = await message.populate({
				path: "chat",
				populate: { path: "users", select: "name picture account" },
			});

			await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

			res.json(message);
		} catch (err: any) {
			return res.status(400).json({ msg: err.message });
		}
	},
};

export default messageCtrl;
