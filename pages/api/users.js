import Users from "../../models/Users";
import { mongooseConnect } from "../../lib/lib";
import bcrypt from "bcrypt";

export default async function ApiUsers(req, res) {
	const { method } = req;
	mongooseConnect();
	const session = req.cookies?.auth;
	try {
		if (method === "GET") {
			const user = await Users.findOne({ _id: session });
			res.status(200).json(user);
		} else if (method === "PATCH") {
			const { product } = req.body;
			if (!session) {
				return res.status(201).json({ result: "bad" });
			}
			const user = await Users.findOne({ _id: session });
			const index = user.cart.findIndex((prod) => prod._id == product._id);
			if (req.body?.method) {
				const { method } = req.body;
				if (method === "increment") {
					user.cart[index].count++;
				} else {
					user.cart[index].count--;
				}
			} else {
				if (~index) {
					user.cart[index].count++;
				} else {
					user.cart.push(product);
				}
			}
			user.markModified("cart");
			await user.save();
			res.status(200).json({ result: "good" });
		} else if (method === "PUT") {
			const salt = await bcrypt.genSalt(5);
			const hashedPassword = await bcrypt.hash(req.body?.password, salt);
			await Users.findOneAndUpdate(
				{ _id: session },
				{ passwrod: hashedPassword }
			);
			res.status(200).json({ result: "good" });
		}
	} catch (e) {
		res.status(500).json({ result: "bad" });
	}
}
