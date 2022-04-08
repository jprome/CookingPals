import { Request, Response } from "express";
import { IReqAuth } from "../config/interface";
import Users from "../models/userModel";
import cookbook from "../models/cookbookModel";

import { populate_user } from "../middleware/populate";

const cookbookCtrl = {
	updateCookbook: async (req: IReqAuth, res: Response) => {
		// Validate user
		if (!req.user)
			return res.status(400).json({ msg: "Invalid Authentication." });

		try {
			// Update Cookbook
			const { cookbook } = req.body;
			const updatedUser = await populate_user(
				Users.findOneAndUpdate(
					{ _id: req.user._id, "cookbook._id": cookbook._id },
					{
						$set: {
							cookbook: cookbook,
						},
					},
					{ new: true }
				)
			);

			return res.status(200).json(updatedUser);
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},

	createCookbook: async (req: IReqAuth, res: Response) => {
		// Validate user
		if (!req.user)
			return res.status(400).json({ msg: "Invalid Authentication." });

		try {
			// Add cookbook
			const { cookbook } = req.body;
			const updatedUser = await populate_user(
				Users.findOneAndUpdate(
					{ _id: req.user._id },
					{
						$push: { cookbook: cookbook },
					},
					{ new: true }
				)
			);

			return res.status(200).json(updatedUser);
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},

	getCookbook: async (req: Request, res: Response) => {
		try {
			// Find cookbook
			const book = await Users.find({ "cookbook._id": req.query.id }).select(
				"cookbook"
			);

			return res.status(200).json(book);
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},

	deleteCookbook: async (req: IReqAuth, res: Response) => {
		if (!req.user)
			return res.status(400).json({ msg: "Invalid Authentication." });
		try {
			const updatedUser = await Users.findOneAndUpdate(
				{ _id: req.user._id },
				{
					$pull: {
						cookbook: {
							_id: req.query.id,
						},
					},
				},
				{ new: true }
			);

			return res.status(200).json(updatedUser);
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},
};

export default cookbookCtrl;
