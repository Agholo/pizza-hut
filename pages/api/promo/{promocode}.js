import { mongooseConnect } from "../../../lib/lib";
import Promocode from "../../../models/Promocode";

export default async function ApiPromocode(req, res) {
	const { method } = req;
	mongooseConnect();
	try {
		if (method === "GET") {
			const promo = req.query?.promocode.toLocalUpperCase();
			if (promo) {
				const sell = await Promocode.findOne({ code: promo });
				res.status(200).json({ sell });
			}
		} else {
			throw new Error("method is not allowed");
		}
	} catch (e) {
		res.status(500).json({ message: e });
	}
}
