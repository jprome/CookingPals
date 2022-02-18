import { Request, Response } from "express";
import { IReqAuth } from "../config/interface";
import Users from "../models/userModel";

const referenceCtrl = {
	updateReference: async (req: IReqAuth, res: Response) => {
		if (!req.user)
			return res.status(400).json({ msg: "Invalid Authentication." });

		try {
			const { reference } = req.body;
			reference.reference_author = req.user._id;
			await Users.updateOne(
				{
					"references._id": reference._id,
					"references.reference_author": req.user._id,
				},
				{
					$set: {
						reference: reference,
					},
				}
			);

			res.json({ msg: "Update Success!" });
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},

	createReference: async (req: IReqAuth, res: Response) => {
		if (!req.user)
			return res.status(400).json({ msg: "Invalid Authentication." });

		try {
			const { reference, to_id } = req.body;
			reference.reference_author = req.user._id;

			await Users.findOneAndUpdate(
				{ _id: to_id },
				{
					$push: { references: reference },
				}
			);

			res.json({ msg: "reference added" });
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},

	getReference: async (req: Request, res: Response) => {
		try {
			const reference = await Users.find({
				"references._id": req.body.id,
			}).select("references");

			res.json(reference);
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},

	deleteReference: async (req: IReqAuth, res: Response) => {
		if (!req.user)
			return res.status(400).json({ msg: "Invalid Authentication." });
		try {
			await Users.updateOne(
				{ _id: req.body.id, "references.reference_author": req.user._id },
				{
					$pull: {
						reference: {
							_id: req.body.id,
						},
					},
				}
			);

			return res.status(204).json({ msg: "reference deleted" });
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},
};

export default referenceCtrl;
