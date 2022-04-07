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
import { populate_user } from "../middleware/populate";

const authCtrl = {
	register: async (req: Request, res: Response) => {
		try {
			// Check if User account already exists
			const userFound = await Users.findOne({
				account: req.body.account,
			});

			if (userFound)
				return res
					.status(400)
					.json({ msg: "Email or Phone number already exists." });

			// Hash password
			const passwordHash = await bcrypt.hash(req.body.password, 12);
			// Construct new user
			const newUser = new Users({
				name: req.body.name,
				account: req.body.account,
				password: passwordHash,
				location: req.body.location,
				dob: req.body.dob,
				intro: "",
				friends: [],
				friendRequestReceived: [],
				friendRequestGiven: [],
				groups: [],
				picture: "",
				references: [],
				cookbooks: [],
				request: {
					description: "",
					give_cooking: 0,
					give_experience: 0,
					give_ingredient: 0,
					receive_cooking: 0,
					receive_experience: 0,
					receive_ingredient: 0,
					diets: [],
					weekly_budget: 0,
					active: false,
					location: "",
				},

				// TODO: Add other profile properties
			});

			// validate email or phone and send confirmation
			if (validateEmail(req.body.account)) {
				// TODO: Send a confirmation email
				// sendMail(account, url, "Verify your email address");
				// TODO: Later we will save this user n an activate route
				await newUser.save();
				return res
					.status(200)
					.json({ msg: "Success! Please check your email." });
			} else if (validPhone(req.body.account)) {
				// TODO: Send a confirmation phone
				// sendSms(account, url, "Verify your phone number");
				// TODO: Later we will save this user n an activate route
				await newUser.save();
				return res.status(200).json({ msg: "Success! Please check phone." });
			}
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},

	login: async (req: Request, res: Response) => {
		try {
			const { account, password } = req.body;

			// Check if user exists
			const user = await Users.findOne({ account });
			if (!user)
				return res.status(400).json({ msg: "This account does not exits." });

			loginUser(user, password, res);
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},
	logout: async (req: Request, res: Response) => {
		try {
			res.clearCookie("refreshtoken", { path: `/api/auth/refresh_token` });
			return res.status(200).json({ msg: "Logged out!" });
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

			return res.status(200).json({ access_token, user });
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},
};

const loginUser = async (user: IUser, password: string, res: Response) => {
	// Check if passswords match
	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) return res.status(400).json({ msg: "Password is incorrect." });

	// Generate new refresh_tokens and access_tokens
	const access_token = generateAccessToken({ id: user._id });
	const refresh_token = generateRefreshToken({ id: user._id });

	//  Add cookie to refreshToken path
	res.cookie("refreshtoken", refresh_token, {
		httpOnly: true,
		path: `/api/auth/refresh_token`,
		maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
	});
	const user_model = await populate_user(Users.findById(user._id));
	// Respond with User
	res.json({
		msg: "Login Success!",
		access_token,
		user: user_model,
	});
};

export default authCtrl;
