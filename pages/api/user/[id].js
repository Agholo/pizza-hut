import Users from "../../../models/Users";
import { mongooseConnect } from "../../../lib/lib";

export default async function ChangeUser(req, res) {
	mongooseConnect();
	try {
		const id = req.query.id;
		const { role } = req.body;
		await Users.findOneAndUpdate(
			{ _id: id },
			{
				role,
			}
		);
		res.status(200).json({ message: "updated" });
	} catch (e) {
		console.error(e);
	}
}
