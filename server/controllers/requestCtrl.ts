import { Request, Response } from "express";
import { IReqAuth } from "../config/interface";
import Users from "../models/userModel";

const requestCtrl = {
	updateRequest: async (req: IReqAuth, res: Response) => {
		if (!req.user)
			return res.status(400).json({ msg: "Invalid Authentication." });

		try {
			const requestUpdate = req.body;
			await Users.findOneAndUpdate(
				{ _id: req.user._id },
				{
					$set: {
						request: requestUpdate,
					},
				}
			);

			res.json({ msg: "Update Success!" });
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},
	getRequest: async (req: Request, res: Response) => {
		try {
			const request = await Users.find({
				"request._id": req.body.id,
			}).select("request");

			res.json(request);
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},
	searchRequests: async (req: Request, res: Response) => {
		try {
			const cookingFilter = getMatch(req.body.cooking);
			const ingredientsFilter = getMatch(req.body.ingredient);
			const experienceFilter = getMatch(req.body.experience);

			const request = await Users.find({
				"request.cooking": { $in: cookingFilter },
				"request.ingredients": { $in: ingredientsFilter },
				"request.experience": { $in: experienceFilter },
				$and: [
					{ "request.budget": { $gte: req.body.budgetLow } },
					{ "request.budget": { $lte: req.body.budgetHigh } },
				],
			}).select("request");

			res.json(request);
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},
};
const getMatch = (num: Number) => {
	if (num === 0) return [0, -1, 1];
	else if (num === 1) return [1, 0];
	else if (num == -1) return [-1, 0];
	else return [];
};

export default requestCtrl;
