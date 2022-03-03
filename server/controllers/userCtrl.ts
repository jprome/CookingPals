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
			await Users.findOneAndUpdate({ _id: req.user._id }, userUpdate);

			return res.status(204).json(userUpdate);
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
				}
			);

			res.status(204).json({ msg: "Reset Password Success!" });
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},

	getUser: async (req: Request, res: Response) => {
		try {
			const user = await Users.findById(req.params.id).select("-password");
			if (!user) return res.status(404).json({ msg: "User not found" });

			return res.status(204).json(user);
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},

	deleteUser: async (req: Request, res: Response) => {
		try {
			const profileFound = await Users.findOneAndRemove({ _id: req.body.id });
			if (!profileFound) return res.status(404).json({ msg: "User not found" });

			return res.status(204).json({ msg: "User deleted" });
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},
};

export default userCtrl;
