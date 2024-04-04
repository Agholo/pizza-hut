import nodemailer from "nodemailer";
import Recover from "../../models/Recover";
import Users from "../../models/Users";
import { mongooseConnect } from "./../../lib/lib";

export default async function handler(req, res) {
	const { email } = req.body;
	const { method } = req;
	mongooseConnect();
	if (method === "POST") {
		if (req.body.pin) {
			const recoveringMail = await Recover.findOne({ email });
			if (recoveringMail?.pin === req.body.pin) {
				res.status(200).json({ message: "good" });
			} else {
				res.status(200).json({ message: "bad" });
			}
		} else {
			const user = Users.findOne({ email });
			if (!user) {
				res.status(403).json({ message: "not found" });
			} else {
				const transporter = nodemailer.createTransport({
					name: "pizza-hut",
					host: "smtp.elasticemail.com",
					port: 465,
					secure: true,
					auth: {
						user: process.env.MAIL_LOGIN,
						pass: process.env.MAIL_PASSWORD,
					},
					sendMail: true,
				});

				let random = "";

				for (let i = 0; i < 4; i++) {
					const num = Math.floor(Math.random() * 10);
					random += num;
				}

				const options = {
					from: process.env.MAIL_LOGIN,
					to: email,
					subject: "password recover message",
					text: "recover your password to write this 4 digit number in our webpage",
					Email: email,
					html: `<h1>hello your recovery code is ${random}</h1>`,
				};

				try {
					await transporter.sendMail(options);
					const recoveringMail = await Recover.findOne({ email });
					if (recoveringMail) {
						recoveringMail.pin = random;
						await recoveringMail.save();
					} else {
						await Recover.create({ email, pin: random });
					}
					res.status(200).json({ message: "Email sent successfully" });
				} catch (error) {
					console.error("Error sending email:", error);
					res.status(500).json({ message: "Failed to send email" });
				}
			}
		}
	} else if (method === "DELETE") {
		const { email } = req.data;
		await Recover.findOneAndDelete({ email });
	} else {
		res.status(500).json({ message: "method not allowed" });
	}
}
