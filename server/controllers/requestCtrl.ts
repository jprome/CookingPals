import { Request, Response } from "express";
import { IReqAuth } from "../config/interface";
import Users from "../models/userModel";
import { populate_user } from "../middleware/populate";

const requestCtrl = {
	updateRequest: async (req: IReqAuth, res: Response) => {
		// Validate User
		if (!req.user)
			return res.status(400).json({ msg: "Invalid Authentication." });

		try {
			// Update User
			const request = req.body;
			const updatedUser = await populate_user(
				Users.findOneAndUpdate(
					{ _id: req.user._id },
					{
						$set: {
							request: request,
						},
					},
					{ new: true }
				)
			);

			return res.status(200).json(updatedUser);
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},
	getRequest: async (req: Request, res: Response) => {
		try {
			// Get request
			const request = await populate_user(
				Users.find({
					"request._id": req.query.id,
				})
			);

			return res.status(200).json(request);
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},
	searchRequests: async (req: Request, res: Response) => {
		try {
			// Get filters
			const give_cookingFilter = getMatch(Number(req.query.give_cooking));
			const give_ingredientsFilter = getMatch(
				Number(req.query.give_ingredient)
			);
			const give_experienceFilter = getMatch(Number(req.query.give_experience));
			const receive_cookingFilter = getMatch(Number(req.query.receive_cooking));
			const receive_ingredientsFilter = getMatch(
				Number(req.query.receive_ingredient)
			);
			const receive_experienceFilter = getMatch(
				Number(req.query.receive_experience)
			);

			// Create query filter
			var filter = {
				"request.give_cooking": { $in: receive_cookingFilter },
				"request.give_ingredient": { $in: receive_ingredientsFilter },
				"request.give_experience": { $in: receive_experienceFilter },
				"request.receive_cooking": { $in: give_cookingFilter },
				"request.receive_ingredient": { $in: give_ingredientsFilter },
				"request.receive_experience": { $in: give_experienceFilter },
				"request.location": req.query.location,
				"request.diets": { $in: req.query.diets },
				"request.active": true,
				$and: [
					{ "request.weekly_budget": { $gte: req.query.budgetLow } },
					{ "request.weekly_budget": { $lte: req.query.budgetHigh } },
				],
			};

			// Find request based on filter
			const request = await populate_user(Users.find(filter));

			return res.status(200).json(request);
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},
};

// 0 is maybe, -1 is not doing it, 1 is doing it
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
