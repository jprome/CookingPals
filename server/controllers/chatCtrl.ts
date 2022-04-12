import { compareSync } from "bcrypt";
import { Request, Response } from "express";
import { IReqAuth } from "../config/interface";
import chat from "../models/chatModel";
var ObjectId = require("mongodb").ObjectId;

const chatCtrl = {
	accessChat: async (req: IReqAuth, res: Response) => {
		// Validate User
		if (!req.user)
			return res.status(400).json({ msg: "Invalid Authentication." });

		const { userId } = req.body;

		if (req.user._id == userId)
			return res
				.status(400)
				.json({ msg: "Cannot create a chat with yourself!" });

		// Check param was sent
		if (!userId) {
			console.log("UserId param not sent with request");
			return res.sendStatus(400);
		}

		// Find Chat
		const isChat = await chat
			.find({
				isGroupChat: false,
				$and: [
					{ users: { $elemMatch: { $eq: ObjectId(req.user._id) } } },
					{ users: { $elemMatch: { $eq: ObjectId(userId) } } },
				],
			})
			.populate("users", "_id name account picture")
			.populate({
				path: "latestMessage",
				populate: { path: "sender", select: "name picture account" },
			});
		// If Chat exist respond with it, else make a new Chat
		if (isChat.length > 0) {
			res.send(isChat[0]);
		} else {
			// Make new Chat
			var ChatData = {
				chatName: "sender",
				isGroupChat: false,
				users: [req.user._id, userId],
			};
			try {
				// Create Chat
				const createdChat = await chat.create(ChatData);
				const FullChat = await chat
					.findOne({
						_id: createdChat._id,
					})
					.populate("users", "_id name account picture");
				// responde with Chat
				res.status(200).json(FullChat);
			} catch (err: any) {
				return res.status(500).json({ msg: err.message });
			}
		}
	},

	getChats: async (req: IReqAuth, res: Response) => {
		// Validate User
		if (!req.user)
			return res.status(400).json({ msg: "Invalid Authentication." });
		try {
			// Get Chats
			const chats = await chat
				.find({
					users: { $elemMatch: { $eq: ObjectId(req.user._id) } },
				})
				.populate("users", "name picture account")
				.populate("groupAdmin", "-password")
				.populate("latestMessage")
				.populate({
					path: "latestMessage",
					populate: { path: "sender", select: "name picture account" },
				})
				.sort({ updatedAt: -1 });

			// respond with Chats
			return res.status(200).json(chats);
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},
};

export default chatCtrl;
