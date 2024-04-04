import Orders from "../../models/Orders";
import Users from "../../models/Users";
import { mongooseConnect } from "../../lib/lib";

export default async function ApiOrders(req, res) {
	const { method } = req;
	mongooseConnect();
	try {
		if (method === "GET") {
			const orders = await Orders.find();
			res.status(200).json(orders);
		} else if (method === "POST") {
			const session = req.cookies?.auth;
			// make validation for data
			if (session) {
				const orderData = { ...req.body, user: session };
				const o = await Orders.create(orderData);
				await Users.findOneAndUpdate(
					{ _id: session },
					{ $push: { orders: o._id } }
				);
				res.status(200).json({ message: "good" });
			} else {
				res.status(499).json({ message: "bed" });
			}
		} else {
			res.status(405).json({ message: "Method Not Allowed" });
		}
	} catch (e) {
		console.error(e);
		res.status(500).json({ message: "Internal Server Error" });
	}
}
