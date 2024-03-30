import { mongooseConnect } from "../../lib/lib";
import Users from "../../models/Users.js";
import bcrypt from "bcrypt";

export default async function POST(req, res) {
	mongooseConnect();
	const { email, password } = req.body;
	const salt = await bcrypt.genSalt(5);
	const hashedPassword = await bcrypt.hash(password, salt);
	await Users.create({
		email: email,
		password: hashedPassword,
	});
	res.status(200);
}
