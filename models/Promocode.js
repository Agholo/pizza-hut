import mongoose from "mongoose";

const Schema = mongoose.Schema;

const promocodesSchema = new Schema({
	code: String,
	sell: Number,
});

export default mongoose.models.Promocodes ||
	mongoose.model("Promocodes", promocodesSchema);
