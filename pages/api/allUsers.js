import Users from "../../models/Users";
import { mongooseConnect } from "../../lib/lib";

export default async function getAllUsers(req, res) {
	mongooseConnect();
	const users = await Users.find();
	res.status(200).json(users);
}
