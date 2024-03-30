import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productsSchema = new Schema({
	name: { type: String, required: true },
	price: { type: String, required: true },
	image: { type: String, required: true },
	category: { type: String, default: "ՊԻՑՑԱ" },
});

export default mongoose.models.Products ||
	mongoose.model("Products", productsSchema);
