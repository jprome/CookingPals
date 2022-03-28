import { Request, Response } from "express";
import { IReqAuth } from "../config/interface";
import Users from "../models/userModel";
import friendRequest from "../models/friendRequestModel";
var ObjectId = require("mongodb").ObjectId;

import bcrypt from "bcrypt";

const userCtrl = {
	updateUser: async (req: IReqAuth, res: Response) => {
		if (!req.user)
			return res.status(400).json({ msg: "Invalid Authentication." });

		try {
			const userUpdate = req.body;
			const newUser = await Users.findOneAndUpdate(
				{ _id: req.user._id },
				userUpdate,
				{
					new: true,
				}
			)
				.select("-password")
				.populate({
					path: "references",
					populate: {
						path: "reference_author",
						select: "name picture account",
					},
				})
				.populate("friends", "name");

			return res.status(200).json(newUser);
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},
	requestFriend: async (req: IReqAuth, res: Response) => {
		if (!req.user)
			return res.status(400).json({ msg: "Invalid Authentication." });

		if (req.user.friends.includes(ObjectId(req.body.friend_id)))
			return res.status(400).json({ msg: "Already a friend with this user" });

		try {
			const createdRequest = await friendRequest.create({
				userRequest: ObjectId(req.user.id),
				userRecipient: ObjectId(req.body.friend_id),
				status: 1,
			});

			const userRequestUpdate = await Users.findOneAndUpdate(
				{ _id: req.user._id },
				{
					$push: { friendRequestGiven: createdRequest._id },
				},
				{ new: true }
			)
				.select("-password")
				.populate({
					path: "references",
					populate: {
						path: "reference_author",
						select: "name picture account",
					},
				})
				.populate("friends", "name");

			await Users.findOneAndUpdate(
				{ _id: req.body.friend_id },
				{
					$push: { friendRequestReceived: createdRequest._id },
				},
				{ new: true }
			);

			return res.status(200).json(userRequestUpdate);
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},

	respondFriend: async (req: IReqAuth, res: Response) => {
		if (!req.user)
			return res.status(400).json({ msg: "Invalid Authentication." });
		if (req.user.friends.includes(ObjectId(req.body.friend_id)))
			return res.status(400).json({ msg: "Already a friend with this user" });
		try {
			const response = req.body.status;
			const friendRequest_id = req.body.friendRequest_id;

			const friendReq = await friendRequest.findById(friendRequest_id);

			if (!friendReq)
				return res.status(400).json({ msg: "Invalid friendRequest." });

			if (req.user.friends.includes(ObjectId(friendReq.userRequest)))
				return res.status(400).json({ msg: "Already a friend with this user" });

			if (response == 2) {
				const userRequestUpdate = await Users.findOneAndUpdate(
					{ _id: req.user._id },
					{
						$pull: { friendRequestReceived: friendRequest_id },
						$push: { friends: friendReq.userRequest },
					},
					{ new: true }
				)
					.select("-password")
					.populate({
						path: "references",
						populate: {
							path: "reference_author",
							select: "name picture account",
						},
					})
					.populate("friends", "name");

				await Users.findOneAndUpdate(
					{ _id: friendReq.userRequest },
					{
						$pull: { friendRequestGiven: friendRequest_id },
						$push: { friends: friendReq.userRecipient },
					},
					{ new: true }
				);
				await friendRequest.findByIdAndDelete(friendRequest_id);

				return res.status(200).json(userRequestUpdate);
			} else if (response == 3) {
				await friendRequest.findByIdAndDelete(friendRequest_id);
				return res.status(200).json({ msg: "friend request rejectedr" });
			}
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},

	resetPassword: async (req: IReqAuth, res: Response) => {
		if (!req.user)
			return res.status(400).json({ msg: "Invalid Authentication." });

		try {
			const { password } = req.body;
			const passwordHash = await bcrypt.hash(password, 12);

			await Users.findOneAndUpdate(
				{ _id: req.user._id },
				{
					password: passwordHash,
				},
				{ new: true }
			);

			res.status(200).json({ msg: "Reset Password Success!" });
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},

	getUser: async (req: Request, res: Response) => {
		try {
			const user = await Users.findById(req.query.id)
				.select("-password")
				.populate({
					path: "references",
					populate: {
						path: "reference_author",
						select: "name picture account",
					},
				})
				.populate("friends", "name");
			if (!user) return res.status(404).json({ msg: "User not found" });

			return res.status(200).json(user);
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},

	deleteUser: async (req: Request, res: Response) => {
		try {
			const profileFound = await Users.findOneAndRemove({ _id: req.body.id });
			if (!profileFound) return res.status(404).json({ msg: "User not found" });

			return res.status(200).json({ msg: "User deleted" });
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},
};

export default userCtrl;
