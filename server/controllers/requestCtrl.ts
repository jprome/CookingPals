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
				},
				{ new: true }
			);

			return res.status(200).json({ msg: "Update Success!" });
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},
	getRequest: async (req: Request, res: Response) => {
		try {
			const request = await Users.find({
				"request._id": req.body.id,
			}).populate({
				path: "references",
				populate: {
					path: "reference_author",
					select: "name picture account",
				},
			});

			return res.status(200).json(request);
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},
	searchRequests: async (req: Request, res: Response) => {
		try {
			const give_cookingFilter = getMatch(Number(req.body.give_cooking));
			const give_ingredientsFilter = getMatch(Number(req.body.give_ingredient));
			const give_experienceFilter = getMatch(Number(req.body.give_experience));
			const receive_cookingFilter = getMatch(Number(req.body.receive_cooking));
			const receive_ingredientsFilter = getMatch(
				Number(req.body.receive_ingredient)
			);
			const receive_experienceFilter = getMatch(
				Number(req.body.receive_experience)
			);

			var filter = {
				"request.give_cooking": { $in: receive_cookingFilter },
				"request.give_ingredient": { $in: receive_ingredientsFilter },
				"request.give_experience": { $in: receive_experienceFilter },
				"request.receive_cooking": { $in: give_cookingFilter },
				"request.receive_ingredient": { $in: give_ingredientsFilter },
				"request.receive_experience": { $in: give_experienceFilter },
				"request.location": req.body.location,
				"request.diets": { $in: req.body.diets },
				"request.active": true,
				$and: [
					{ "request.weekly_budget": { $gte: req.body.budgetLow } },
					{ "request.weekly_budget": { $lte: req.body.budgetHigh } },
				],
			};

			const request = await Users.find(filter).populate({
				path: "references",
				populate: {
					path: "reference_author",
					select: "name picture account",
				},
			});

			return res.status(200).json(request);
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
