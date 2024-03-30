import Users from "../../models/Users";
import { mongooseConnect } from "./../../lib/lib";

export default async function CartItems(req, res) {
	const { method } = req;
	mongooseConnect();
	try {
		if (method === "GET") {
			const session = req.cookies?.auth;
			const user = await Users.findOne({ _id: session });
			res.status(200).json({ cart: user.cart });
		} else if (method === "DELETE") {
			const session = req.cookies?.auth;
			const id = req?.body?.id;
			if (id) {
				const user = await Users.findOne({ _id: session });
				if (user) {
					user.cart = user.cart.filter((product) => product._id != id);
					await user.save();
				}
			} else {
				await Users.findOneAndUpdate({ _id: session }, { cart: [] });
			}
			res
				.status(200)
				.json({ message: "all cart products is successfuly deleted" });
		} else {
			res.status(403).json({ message: "request method is not allowed" });
		}
	} catch (e) {
		res.status(500).json({ message: "internal server error" });
	}
}
