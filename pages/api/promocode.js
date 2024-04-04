import { mongooseConnect } from "../../../lib/lib";
import Promocode from "../../../models/Promocode";

export default async function ApiPromocode(req, res) {
	const { method } = req;
	mongooseConnect();
	try {
		if (method === "POST") {
			const { code, sell } = req.body;
			await Promocode.create({ code, sell });
			res
				.status(200)
				.json({ message: `created ${code} promocode with sell ${sell}` });
		} else {
			throw new Error("method is not allowed");
		}
	} catch (e) {
		res.status(500).json({ message: e });
	}
}
