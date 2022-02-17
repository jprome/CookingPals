import { Request, Response } from "express";
import { IReqAuth } from "../config/interface";
import Users from "../models/userModel";

import Cookbook from "../models/cookbookModel";
import bcrypt from "bcrypt";

const userCtrl = {
	updateCookbook: async (req: IReqAuth, res: Response) => {
		if (!req.user)
			return res.status(400).json({ msg: "Invalid Authentication." });

		try {
			const { cookbook } = req.body;
			await Users.updateOne(
				{ _id: req.user._id },
				{
					$set: {
						cookbook: cookbook,
					},
				}
			);

			res.json({ msg: "Update Success!" });
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},

	createCookbook: async (req: IReqAuth, res: Response) => {
		if (!req.user)
			return res.status(400).json({ msg: "Invalid Authentication." });

		try {
			const { cookbook } = req.body;

			await Users.findOneAndUpdate(
				{ _id: req.user._id },
				{
					$push: { cookbook: cookbook },
				}
			);

			res.json({ msg: "cookbook added" });
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},

	getCookbook: async (req: Request, res: Response) => {
		try {
			const { filters } = req.body;
			console.log(filters);
			const cookbooks = await Users.find({ cookbook: filters });

			res.json(cookbooks);
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},

	deleteCookbook: async (req: IReqAuth, res: Response) => {
		if (!req.user)
			return res.status(400).json({ msg: "Invalid Authentication." });
		try {
			await Users.updateOne(
				{ _id: req.user._id },
				{
					$pull: {
						cookbook: {
							_id: req.body.id,
						},
					},
				}
			);

			return res.status(204).json({ msg: "cookbook deleted" });
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},
};

export default userCtrl;
