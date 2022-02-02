import { Request, Response } from "express";
import { IReqAuth } from "../config/interface";
import Users from "../models/userModel";
import bcrypt from "bcrypt";

const userCtrl = {
	updateUser: async (req: IReqAuth, res: Response) => {
		if (!req.user)
			return res.status(400).json({ msg: "Invalid Authentication." });

		try {
			const { name } = req.body;

			await Users.findOneAndUpdate(
				{ _id: req.user._id },
				{
					name,
				}
			);

			res.json({ msg: "Update Success!" });
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},

	resetPassword: async (req: IReqAuth, res: Response) => {
		if (!req.user)
			return res.status(400).json({ msg: "Invalid Authentication." });

		if (req.user.type !== "register")
			return res.status(400).json({
				msg: `Quick login account with ${req.user.type} can't use this function.`,
			});

		try {
			const { password } = req.body;
			const passwordHash = await bcrypt.hash(password, 12);

			await Users.findOneAndUpdate(
				{ _id: req.user._id },
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

	createUser: async (req: Request, res: Response) => {
		const userFound = await Users.findOne({
			account: req.body.account,
		});

		if (userFound)
			return res.status(303).json({ message: "The User already exists" });

		const passwordHash = await bcrypt.hash(req.body.password, 12);
		const newUser = new Users({
			name: req.body.name,
			account: req.body.account,
			password: passwordHash,
			role: "",
			type: "",
			location: req.body.Location,
			intro: "",
			Friends: [],
			Groups: [],
			// TODO: Add other profile properties
		});
		try {
			const user = await newUser.save();
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
