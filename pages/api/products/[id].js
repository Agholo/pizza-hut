import Products from "../../../models/Products";
import Categories from "../../../models/Categories";
import { mongooseConnect } from "../../../lib/lib";

export default async function ProductsById(req, res) {
	mongooseConnect();
	try {
		const _id = req.query.id;
		const category = await Categories.findOne({ _id });
		const data = await Products.find({ category: category.name });
		res.status(200).json(data);
	} catch (e) {
		res.status(500).json({ message: "iternal server error" });
	}
}
