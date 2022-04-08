import { Request, Response } from "express";
import { IReqAuth } from "../config/interface";
import Users from "../models/userModel";
import { populate_user } from "../middleware/populate";

const referenceCtrl = {
	updateReference: async (req: IReqAuth, res: Response) => {
		// Validaate user
		if (!req.user)
			return res.status(400).json({ msg: "Invalid Authentication." });

		try {
			const { reference } = req.body;
			// Updated reference_author
			reference.reference_author = req.user._id;
			console.log(reference);
			// Update user
			const updatedUser = await populate_user(
				Users.findOneAndUpdate(
					{
						"references._id": reference._id,
						"references.reference_author": req.user._id,
					},
					{
						$set: {
							references: reference,
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

	createReference: async (req: IReqAuth, res: Response) => {
		// Validate User
		if (!req.user)
			return res.status(400).json({ msg: "Invalid Authentication." });

		try {
			const { reference, to_id } = req.body;
			reference.reference_author = req.user._id;

			// Update User
			const updatedUser = await populate_user(
				Users.findOneAndUpdate(
					{ _id: to_id },
					{
						$push: { references: reference },
					},
					{ new: true }
				)
			);

			return res.status(200).json(updatedUser);
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},

	getReference: async (req: Request, res: Response) => {
		try {
			// Get Reference
			const reference = await Users.find({
				"references._id": req.query.id,
			}).select("references");

			return res.status(200).json(reference);
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},

	deleteReference: async (req: IReqAuth, res: Response) => {
		// Validate User
		if (!req.user)
			return res.status(400).json({ msg: "Invalid Authentication." });
		try {
			// Delete reference
			const updatedUser = await populate_user(
				Users.findOneAndUpdate(
					{
						"references.reference_author": req.user._id,
					},
					{
						$pull: {
							references: {
								_id: req.query.id,
							},
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
};

export default referenceCtrl;
