import { mongooseConnect } from "../../../lib/lib";
import Promocode from "../../../models/Promocode";

export default async function ApiPromocode(req, res) {
	const { method } = req;
	mongooseConnect(); // Ensure this function establishes a MongoDB connection

	try {
		if (method === "GET") {
			const promo = req.query?.promocode;
			if (!promo) {
				return res.status(400).json({ message: "Promocode is required" });
			}

			const promoUppercase = promo.toUpperCase();

			const sell = await Promocode.findOne({ code: promoUppercase });
			if (!sell) {
				return res.status(200).json({ message: "Promocode not found" });
			}

			return res.status(200).json({ sell });
		} else {
			throw new Error("Method is not allowed");
		}
	} catch (e) {
		console.error(e);
		return res.status(500).json({ message: "Internal server error" });
	}
}
