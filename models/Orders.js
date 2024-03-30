import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ordersSchema = new Schema({
	user: { type: String, required: true },
	product: { type: String, required: true },
	payed: { type: Boolean, default: false },
	count: { type: Number },
	extra: { type: Object },
});

export default mongoose.models.Orders || mongoose.model("Orders", ordersSchema);
