import Products from "../../models/Products";
import { mongooseConnect } from "./../../lib/lib";

export default async function ApiProduct(req, res) {
	const { method } = req;
	mongooseConnect();
	try {
		if (method === "POST") {
			const { name, price, image, category } = req.body;
			await Products.create({
				name,
				price,
				image,
				category,
			});
		} else if (method === "GET") {
			const allProducts = await Products.find();
			res.status(200).json(allProducts);
		}
		res.status(200).json({ message: "ok" });
	} catch (e) {
		console.error(e);
	}
}
