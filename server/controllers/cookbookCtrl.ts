import { Request, Response } from "express";
import { IReqAuth } from "../config/interface";
import Users from "../models/userModel";

const cookbookCtrl = {
	updateCookbook: async (req: IReqAuth, res: Response) => {
		if (!req.user)
			return res.status(400).json({ msg: "Invalid Authentication." });

		try {
			const { cookbook } = req.body;
			await Users.updateOne(
				{ _id: req.user._id, "cookbook._id": cookbook._id },
				{
					$set: {
						cookbooks: cookbook,
					},
				}
			);

			return res.status(204).json({ msg: "Update Success!" });
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
					$push: { cookbooks: cookbook },
				}
			);

			return res.status(204).json({ msg: "cookbook added" });
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},

	getCookbook: async (req: Request, res: Response) => {
		try {
			const cookbook = await Users.find({ "cookbook._id": req.body.id }).select(
				"cookbook"
			);

			return res.status(204).json(cookbook);
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
						cookbooks: {
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

export default cookbookCtrl;
