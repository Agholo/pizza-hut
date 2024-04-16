import Promocode from "../../models/Promocode";
import { mongooseConnect } from "./../../lib/lib";

export default async function ApiPromocode(req, res) {
	const { method } = req;
	mongooseConnect();
	try {
		if (method === "POST") {
			const { promocode, sall } = req.body;
			const has = await Promocode.findOne({ promocode });
			if (has) {
				res.status(200).json({ has: true });
				return;
			}
			await Promocode.create(req.body);
			res
				.status(200)
				.json({ message: `created ${promocode} promocode with sell ${sall}` });
		} else if (method === "PUT") {
			const { promocode } = req.body;
			await Promocode.findOneAndUpdate({ promocode }, req.body);
			res.status(200).json({ has: false });
		} else {
			throw new Error("method is not allowed");
		}
	} catch (e) {
		res.status(500).json({ message: e });
	}
}
