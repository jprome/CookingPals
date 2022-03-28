import { Request, Response } from "express";
import { IReqAuth } from "../config/interface";
import Users from "../models/userModel";

const referenceCtrl = {
	updateReference: async (req: IReqAuth, res: Response) => {
		// Validaate user
		if (!req.user)
			return res.status(400).json({ msg: "Invalid Authentication." });

		try {
			const { reference } = req.body;
			// Updated reference_author
			reference.reference_author = req.user._id;

			// Update user
			await Users.updateOne(
				{
					"references._id": reference._id,
					"references.reference_author": req.user._id,
				},
				{
					$set: {
						references: reference,
					},
				}
			);

			return res.status(200).json({ msg: "Update Success!" });
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
			await Users.findOneAndUpdate(
				{ _id: to_id },
				{
					$push: { references: reference },
				},
				{ new: true }
			);

			return res.status(200).json({ msg: "reference added" });
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},

	getReference: async (req: Request, res: Response) => {
		try {
			// Get Reference
			const reference = await Users.find({
				"references._id": req.query.id,
			})
				.select("references")
				.populate("reference_author", "name picture account");

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
			await Users.updateOne(
				{
					"references.reference_author": req.user._id.toString(),
				},
				{
					$pull: {
						references: {
							_id: req.body.id,
						},
					},
				}
			);

			return res.status(200).json({ msg: "reference deleted" });
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},
};

export default referenceCtrl;
