import { Request, Response } from "express";
import { IReqAuth } from "../config/interface";
import Users from "../models/userModel";
import bcrypt from "bcrypt";

const userCtrl = {
	updateUser: async (req: IReqAuth, res: Response) => {
		if (!req.user)
			return res.status(400).json({ msg: "Invalid Authentication." });

		try {
			const userUpdate = req.body;
			await Users.findOneAndUpdate({ account: req.user.account }, userUpdate);

			res.json({ msg: "Update Success!" });
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},

	resetPassword: async (req: IReqAuth, res: Response) => {
		if (!req.user)
			return res.status(400).json({ msg: "Invalid Authentication." });

		// if (req.user.type !== "register")
		// 	return res.status(400).json({
		// 		msg: `Quick login account with ${req.user.type} can't use this function.`,
		// 	});

		try {
			const { password } = req.body;
			const passwordHash = await bcrypt.hash(password, 12);

			await Users.findOneAndUpdate(
				{ account: req.user.account },
				{
					password: passwordHash,
				}
			);

			res.json({ msg: "Reset Password Success!" });
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},

	getUser: async (req: Request, res: Response) => {
		try {
			const user = await Users.findOne({ account: req.body.account }).select(
				"-password"
			);
			if (!user) return res.status(404).json();

			res.json(user);
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},

	deleteUser: async (req: Request, res: Response) => {
		try {
			const profileFound = await Users.findOneAndRemove({
				account: req.body.account,
			});
			if (!profileFound) return res.status(404).json();

			return res.status(204).json();
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},
};

export default userCtrl;
