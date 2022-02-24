import { Request, Response } from "express";
import { IReqAuth } from "../config/interface";
import Users from "../models/userModel";

const requestCtrl = {
	updateRequest: async (req: IReqAuth, res: Response) => {
		if (!req.user)
			return res.status(400).json({ msg: "Invalid Authentication." });

		try {
			const { request } = req.body;
			await Users.findOneAndUpdate(
				{ _id: req.user._id },
				{
					$set: {
						request: request,
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
			const give_cookingFilter = getMatch(req.body.give_cooking);
			const give_ingredientsFilter = getMatch(req.body.give_ingredient);
			const give_experienceFilter = getMatch(req.body.give_experience);
			const recieve_cookingFilter = getMatch(req.body.recieve_cooking);
			const recieve_ingredientsFilter = getMatch(req.body.recieve_ingredient);
			const recieve_experienceFilter = getMatch(req.body.recieve_experience);

			console.log(give_cookingFilter);
			console.log(give_ingredientsFilter);
			console.log(give_experienceFilter);
			console.log(recieve_cookingFilter);
			console.log(recieve_ingredientsFilter);
			console.log(recieve_experienceFilter);
			const request = await Users.find({
				"request.give_cooking": { $in: recieve_cookingFilter },
				"request.give_ingredient": { $in: recieve_ingredientsFilter },
				"request.give_experience": { $in: recieve_experienceFilter },
				"request.recieve_cooking": { $in: give_cookingFilter },
				"request.recieve_ingredient": { $in: give_ingredientsFilter },
				"request.recieve_experience": { $in: give_experienceFilter },
				$and: [
					{ "request.weekly_budget": { $gte: req.body.budgetLow } },
					{ "request.weekly_budget": { $lte: req.body.budgetHigh } },
				],
			}).select("request");

			res.json(request);
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},
};
const getMatch = (num: Number) => {
	if (num === 0) {
		return [0, -1, 1];
	}
	if (num === 1) {
		return [1, 0];
	}
	if (num === -1) {
		return [-1, 0];
	}
	return [];
};

export default requestCtrl;
