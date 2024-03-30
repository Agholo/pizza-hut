import Orders from "../../models/Orders";
import { mongooseConnect } from "../../lib/lib";

export default async function ApiOrders(req, res) {
	const { method } = req;
	mongooseConnect();
	try {
		if (method === "GET") {
			const orders = await Orders.find();
			res.status(200).json(orders);
		} else {
			res.status(405).json({ message: "Method Not Allowed" });
		}
	} catch (e) {
		console.error(e);
		res.status(500).json({ message: "Internal Server Error" });
	}
}
