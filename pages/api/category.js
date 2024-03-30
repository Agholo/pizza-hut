import { mongooseConnect } from "../../lib/lib";
import Categories from "../../models/Categories";

export default async function ApiCategory(req, res) {
	const { method } = req;
	mongooseConnect();
	try {
		if (method === "GET") {
			const categories = await Categories.find();
			res.status(200).json(categories);
		} else if (method === "POST") {
			const { name, image } = req.body;
			Categories.create({
				name,
				image,
			});
			res.status(200).json({ message: "ok" });
		} else {
			res.status(403).json({ message: "request method is not allowed" });
		}
	} catch (e) {
		res.status(500).json({ message: "eternal server error" });
	}
}
