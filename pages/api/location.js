import { mongooseConnect } from "./../../lib/lib";
import Users from "../../models/Users";

export default async function locationAPI(req, res) {
	const { method } = req;
	mongooseConnect();
	try {
		const session = req.cookies.auth;
		if (method === "POST") {
			const { location } = req.body;
			await Users.findOneAndUpdate(
				{ _id: session },
				{
					$push: { location: { location, description: req.body?.description } },
				}
			);
			res.status(200).json({ message: "good" });
		} else if (method === "GET") {
			const user = await Users.findOne({ _id: session });
			res.status(200).json({ locations: user.location });
		} else {
			res.status(403).json({ message: "method not allowed" });
		}
	} catch (e) {
		console.error(e);
		res.status(500).json({ message: "internal server error " });
	}
}
