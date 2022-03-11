import { Request, Response } from "express";
import { IReqAuth } from "../config/interface";
import Chat from "../models/chatModel";
// import User from "../models/UserModel";

const chatCtrl = {
	accessChat: async (req: IReqAuth, res: Response) => {
		if (!req.user)
			return res.status(400).json({ msg: "Invalid Authentication." });

		const { userId } = req.body;
		if (!userId) {
			console.log("UserId param not sent with request");
			return res.sendStatus(400);
		}

		const isChat = await Chat.find({
			isGroupChat: false,
			$and: [
				{ users: { $elemMatch: { $eq: req.user._id } } },
				{ users: { $elemMatch: { $eq: userId } } },
			],
		})
			.populate("users", "-password")
			.populate({
				path: "latestMessage",
				populate: { path: "sender", select: "name picture account" },
			});

		if (isChat.length > 0) {
			res.send(isChat[0]);
		} else {
			var chatData = {
				chatName: "sender",
				isGroupChat: false,
				users: [req.user._id, userId],
			};
			try {
				const createdChat = await Chat.create(chatData);
				const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
					"users",
					"-password"
				);
				res.status(200).json(FullChat);
			} catch (err: any) {
				return res.status(500).json({ msg: err.message });
			}
		}
	},

	getChats: async (req: IReqAuth, res: Response) => {
		if (!req.user)
			return res.status(400).json({ msg: "Invalid Authentication." });
		try {
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

			return res.status(200).json(chats);
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},
};

export default chatCtrl;
