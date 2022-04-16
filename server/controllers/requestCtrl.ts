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

			if (
				request.cooking == 0 &&
				request.ingredient == 0 &&
				request.experience == 0
			) {
				return res
					.status(400)
					.json({ msg: "You must be willing to give at least one item" });
			}
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
	searchRequests: async (req: IReqAuth, res: Response) => {
		if (!req.user)
			return res.status(400).json({ msg: "Invalid Authentication." });
		try {
			// Get filters
			
			var cookingFilter = [];
			if (Number(req.query.cooking) == 1) {
				cookingFilter = [0, 1];
			} else {
				cookingFilter = [0];
			}
			var filter = {};

			// Create query filter
			if (req.query.diets!.length! > 0) {
				filter = {
					_id: { $ne: req.user._id },
					"request.cooking": { $in: cookingFilter },
					"request.location": req.query.location,
					"request.diets": { $in: req.query.diets },
					"request.active": true,
					$and: [
						{ "request.weekly_budget": { $gte: req.query.budgetLow } },
						{ "request.weekly_budget": { $lte: req.query.budgetHigh } },
					],
				};
			} else {
				filter = {
					_id: { $ne: req.user._id },
					"request.cooking": { $in: cookingFilter },
					"request.location": req.query.location,
					"request.active": true,
					$and: [
						{ "request.weekly_budget": { $gte: req.query.budgetLow } },
						{ "request.weekly_budget": { $lte: req.query.budgetHigh } },
					],
				};
			}

			// Find request based on filter
			const request = await populate_user(Users.find(filter));

			return res.status(200).json(request);
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},
};

export default requestCtrl;
