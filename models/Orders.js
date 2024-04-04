import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ordersSchema = new Schema({
	user: { type: String, required: true },
	location: { type: String, required: true },
	// method: { type: String, requried: true },
	method: { type: String, requried: false },
	name: { type: String, required: true },
	phone: { type: String, required: true },
	mail: { type: String, required: true },
	price: { type: Number, requried: true },
	// payed: { type: Boolean, default: false },
	products: { type: [[String]], required: true },
	description: { type: String },
});

export default mongoose.models.Orders || mongoose.model("Orders", ordersSchema);
