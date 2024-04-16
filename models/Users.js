import mongoose from "mongoose";
const Schema = mongoose.Schema;

const usersSchema = new Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	role: { type: String, default: "USER" },
	cart: { type: [Object] },
	orders: { type: [String] },
	location: { type: [Object] },
});

export default mongoose.models.Users || mongoose.model("Users", usersSchema);
