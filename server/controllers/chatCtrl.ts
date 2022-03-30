import { Request, Response } from "express";
import { IReqAuth } from "../config/interface";
import Chat from "../models/chatModel";

const chatCtrl = {
	accessChat: async (req: IReqAuth, res: Response) => {
		// Validate User
		if (!req.user)
			return res.status(400).json({ msg: "Invalid Authentication." });

		const { userId } = req.body;

		// Check param was sent
		if (!userId) {
			console.log("UserId param not sent with request");
			return res.sendStatus(400);
		}

		// Find chat
		const isChat = await Chat.find({
			isGroupChat: false,
			$and: [
				{ users: { $elemMatch: { $eq: req.user._id } } },
				{ users: { $elemMatch: { $eq: userId } } },
			],
		})
			.populate("users", "_id name account picture")
			.populate({
				path: "latestMessage",
				populate: { path: "sender", select: "name picture account" },
			});

		// If chat exist respond with it, else make a new chat
		if (isChat.length > 0) {
			res.send(isChat[0]);
		} else {
			// Make new chat
			var chatData = {
				chatName: "sender",
				isGroupChat: false,
				users: [req.user._id, userId],
			};
			try {
				// Create chat
				const createdChat = await Chat.create(chatData);
				const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
					"users",
					"_id name account picture"
				);
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
			const chats = await Chat.find({
				users: { $elemMatch: { $eq: req.user._id } },
			})
				.populate("users", "-password")
				.populate("groupAdmin", "-password")
				.populate("latestMessage")
				.populate({
					path: "latestMessage",
					populate: { path: "sender", select: "name picture account" },
				})
				.sort({ updatedAt: -1 });

			// respond with chats
			return res.status(200).json(chats);
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},
};

export default chatCtrl;
