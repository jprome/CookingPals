import { Request, Response } from "express";
import { IReqAuth } from "../config/interface";
import Users from "../models/userModel";
import friendRequest from "../models/friendRequestModel";
import { populate_user } from "../middleware/populate";
import bcrypt from "bcrypt";
var ObjectId = require("mongodb").ObjectId;

const userCtrl = {
	updateUser: async (req: IReqAuth, res: Response) => {
		// Validate User
		if (!req.user)
			return res.status(400).json({ msg: "Invalid Authentication." });

		try {
			// Update User
			const userUpdate = req.body;
			const newUser = await populate_user(
				Users.findOneAndUpdate({ _id: req.user._id }, userUpdate, {
					new: true,
				})
			);

			return res.status(200).json(newUser);
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},
	requestFriend: async (req: IReqAuth, res: Response) => {
		// Validate User
		if (!req.user)
			return res.status(400).json({ msg: "Invalid Authentication." });

		// Check if user already has this friend
		if (req.user.friends.includes(ObjectId(req.body.friend_id)))
			return res.status(400).json({ msg: "Already a friend with this user" });

		try {
			// Create Request
			const createdRequest = await friendRequest.create({
				userRequest: ObjectId(req.user.id),
				userRecipient: ObjectId(req.body.friend_id),
				status: 1,
			});

			// Add request to user's request given
			const userRequestUpdate = await populate_user(
				Users.findOneAndUpdate(
					{ _id: req.user._id },
					{
						$push: { friendRequestGiven: createdRequest },
					},
					{ new: true }
				)
			);

			// Add request to user's request recieved
			await Users.findOneAndUpdate(
				{ _id: req.body.friend_id },
				{
					$push: { friendRequestReceived: createdRequest },
				},
				{ new: true }
			);

			return res.status(200).json(userRequestUpdate);
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},

	respondFriend: async (req: IReqAuth, res: Response) => {
		// Validate User
		if (!req.user)
			return res.status(400).json({ msg: "Invalid Authentication." });

		// Check to see if user isnt in friends list already

		try {
			const response = req.body.status;
			const friendRequest_id = req.body.friendRequest_id;

			// Check to see if freidn request exists
			const friendReq = await friendRequest.findById(friendRequest_id);
			if (!friendReq)
				return res.status(400).json({ msg: "Invalid friendRequest." });

			// Check to see if user isnt in friends list already
			if (req.user.friends.includes(ObjectId(friendReq.userRequest)))
				return res.status(400).json({ msg: "Already a friend with this user" });

			if (response == 2) {
				// Accept user friend Request

				// Update user friends
				const userRequestUpdate = await populate_user(
					Users.findOneAndUpdate(
						{ _id: req.user._id },
						{
							$pull: { friendRequestReceived: friendReq },
							$push: { friends: friendReq.userRequest },
						},
						{ new: true }
					)
				);

				// Update User friends
				await Users.findOneAndUpdate(
					{ _id: friendReq.userRequest },
					{
						$pull: { friendRequestGiven: friendReq },
						$push: { friends: friendReq.userRecipient },
					},
					{ new: true }
				);

				// Delete friend Request
				await friendRequest.findByIdAndDelete(friendRequest_id);

				return res.status(200).json(userRequestUpdate);
			} else if (response == 3) {
				// Reject user
				await friendRequest.findByIdAndDelete(friendRequest_id);
				return res.status(200).json({ msg: "friend request rejectedr" });
			}
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},

	resetPassword: async (req: IReqAuth, res: Response) => {
		// Validate User
		if (!req.user)
			return res.status(400).json({ msg: "Invalid Authentication." });

		try {
			const { password } = req.body;
			// Hash password
			const passwordHash = await bcrypt.hash(password, 12);

			// Update User
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
			// Get user
			const user = await populate_user(Users.findById(req.query.id));

			if (!user) return res.status(404).json({ msg: "User not found" });

			return res.status(200).json(user);
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},

	deleteUser: async (req: Request, res: Response) => {
		try {
			// Delete User
			const profileFound = await Users.findOneAndRemove({ _id: req.query.id });
			if (!profileFound) return res.status(404).json({ msg: "User not found" });

			return res.status(200).json({ msg: "User deleted" });
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},
};

export default userCtrl;
