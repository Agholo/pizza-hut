import { mongooseConnect } from "../../lib/lib";
import Users from "../../models/Users";
import bcrypt from "bcrypt";

export default async function POST(req, res) {
	mongooseConnect();
	const { email, password } = req.body;
	const user = await Users.findOne({
		email: email,
	});
	if (!user) {
		return res.status(404).json({ message: "user not found" });
	}
	const matches = await bcrypt.compare(user.password, password);
	if (matches) {
		return res.status(401).json({ message: "incorrect password" });
	}
	res.setHeader("Set-Cookie", `auth=${user._id}; Path=/`);
	return res.status(200).json(user);
}
