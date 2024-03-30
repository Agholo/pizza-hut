import Users from "../../models/Users";
import { mongooseConnect } from "../../lib/lib";

export default async function ApiUsers(req, res) {
	const { method } = req;
	mongooseConnect();
	const session = req.cookies?.auth;
	try {
		if (method === "GET") {
			const user = await Users.findOne({ _id: session });
			res.status(200).json(user);
		} else if (method === "PUT") {
			const { product } = req.body;
			if (!session) {
				return res.status(401).json({ result: "bad" });
			}
			const user = await Users.findOne({ _id: session });
			const index = user.cart.findIndex((prod) => prod._id === product._id);
			console.log(~index);
			if (~index) {
				user.cart[index].count++;
			} else {
				user.cart.push(product);
			}
			user.markModified("cart");
			await user.save();
			res.status(200).json({ result: "good" });
		}
	} catch (e) {
		res.status(500).json({ message: "eternal server error" });
	}
}
