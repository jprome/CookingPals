import { Request, Response } from "express";
import { IReqAuth } from "../config/interface";
import Users from "../models/userModel";

const requestCtrl = {
	updateRequest: async (req: IReqAuth, res: Response) => {
		if (!req.user)
			return res.status(400).json({ msg: "Invalid Authentication." });

		try {
			const request = req.body;
			await Users.findOneAndUpdate(
				{ _id: req.user._id },
				{
					$set: {
						request: request,
					},
				}
			);

			return res.status(204).json({ msg: "Update Success!" });
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},
	getRequest: async (req: Request, res: Response) => {
		try {
			const request = await Users.find({
				"request._id": req.body.id,
			}).select("request");

			return res.status(204).json(request);
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},
	searchRequests: async (req: Request, res: Response) => {
		try {
			const give_cookingFilter = getMatch(req.body.give_cooking);
			const give_ingredientsFilter = getMatch(req.body.give_ingredient);
			const give_experienceFilter = getMatch(req.body.give_experience);
			const receive_cookingFilter = getMatch(req.body.receive_cooking);
			const receive_ingredientsFilter = getMatch(req.body.receive_ingredient);
			const receive_experienceFilter = getMatch(req.body.receive_experience);

			console.log(give_cookingFilter);
			console.log(give_ingredientsFilter);
			console.log(give_experienceFilter);
			console.log(receive_cookingFilter);
			console.log(receive_ingredientsFilter);
			console.log(receive_experienceFilter);
			const request = await Users.find({
				"request.give_cooking": { $in: receive_cookingFilter },
				"request.give_ingredient": { $in: receive_ingredientsFilter },
				"request.give_experience": { $in: receive_experienceFilter },
				"request.receive_cooking": { $in: give_cookingFilter },
				"request.receive_ingredient": { $in: give_ingredientsFilter },
				"request.receive_experience": { $in: give_experienceFilter },
				$and: [
					{ "request.weekly_budget": { $gte: req.body.budgetLow } },
					{ "request.weekly_budget": { $lte: req.body.budgetHigh } },
				],
			}).select("request");

			return res.status(204).json(request);
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
