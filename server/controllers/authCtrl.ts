import { Request, Response } from "express";
import Users from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
	generateActiveToken,
	generateAccessToken,
	generateRefreshToken,
} from "../config/generateToken";
import { validateEmail, validPhone } from "../middleware/valid";
import { IDecodedToken, IUser } from "../config/interface";

const authCtrl = {
	register: async (req: Request, res: Response) => {
		try {
			const userFound = await Users.findOne({
				account: req.body.account,
			});

			if (userFound)
				return res
					.status(400)
					.json({ msg: "Email or Phone number already exists." });

			const passwordHash = await bcrypt.hash(req.body.password, 12);
			const newUser = new Users({
				name: req.body.name,
				account: req.body.account,
				password: passwordHash,
				role: "",
				type: "",
				location: req.body.location,
				dob: req.body.dob,
				intro: "",
				friends: [],
				groups: [],
				picture: "",
				references: [],
				cookbook: [],

				// TODO: Add other profile properties
			});

			const active_token = generateActiveToken({ newUser });

			if (validateEmail(req.body.account)) {
				// TODO: Send a confirmation email
				// sendMail(account, url, "Verify your email address");
				// TODO: Later we will save this user n an activate route
				await newUser.save();
				return res.json({ msg: "Success! Please check your email." });
			} else if (validPhone(req.body.account)) {
				// TODO: Send a confirmation phone
				// sendSms(account, url, "Verify your phone number");
				// TODO: Later we will save this user n an activate route
				await newUser.save();
				return res.json({ msg: "Success! Please check phone." });
			}

			// new user is sent to home profile - send response with token
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},

	login: async (req: Request, res: Response) => {
		try {
			const { account, password } = req.body;

			const user = await Users.findOne({ account });
			if (!user)
				return res.status(400).json({ msg: "This account does not exits." });

			// if user exists
			loginUser(user, password, res);
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},
	logout: async (req: Request, res: Response) => {
		try {
			res.clearCookie("refreshtoken", { path: `/api/auth/refresh_token` });
			return res.json({ msg: "Logged out!" });
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},
	refreshToken: async (req: Request, res: Response) => {
		try {
			const rf_token = req.cookies.refreshtoken;
			if (!rf_token) return res.status(400).json({ msg: "Please login now!" });

			const decoded = <IDecodedToken>(
				jwt.verify(rf_token, `${process.env.REFRESH_TOKEN_SECRET}`)
			);
			if (!decoded.id)
				return res.status(400).json({ msg: "Please login now!" });

			const user = await Users.findById(decoded.id).select("-password");
			if (!user)
				return res.status(400).json({ msg: "This account does not exist." });

			const access_token = generateAccessToken({ id: user._id });

			res.json({ access_token, user });
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},
};

const loginUser = async (user: IUser, password: string, res: Response) => {
	const isMatch = await bcrypt.compare(password, user.password);

	if (!isMatch) return res.status(400).json({ msg: "Password is incorrect." });

	const access_token = generateAccessToken({ id: user._id });
	const refresh_token = generateRefreshToken({ id: user._id });

	res.cookie("refreshtoken", refresh_token, {
		httpOnly: true,
		path: `/api/auth/refresh_token`,
		maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
	});

	res.json({
		msg: "Login Success!",
		access_token,
		user: { ...user._doc, password: "" },
	});
};

// const registerUser = async (user: IUserParams, res: Response) => {
// 	const newUser = new Users(user);
// 	await newUser.save();

// 	const access_token = generateAccessToken({ id: newUser._id });
// 	const refresh_token = generateRefreshToken({ id: newUser._id });

// 	res.cookie("refreshtoken", refresh_token, {
// 		httpOnly: true,
// 		path: `/api/refresh_token`,
// 		maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
// 	});

// 	res.json({
// 		msg: "Login Success!",
// 		access_token,
// 		user: { ...newUser._doc, password: "" },
// 	});
// };

export default authCtrl;
