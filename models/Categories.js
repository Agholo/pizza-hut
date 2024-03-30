import mongoose from "mongoose";
const Schema = mongoose.Schema;

const categoriesSchema = new Schema({
	image: { type: String, required: true },
	name: { type: String, required: true },
});

export default mongoose.models.Categories ||
	mongoose.model("Categories", categoriesSchema);
