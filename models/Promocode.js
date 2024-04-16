import mongoose from "mongoose";

const Schema = mongoose.Schema;

const promocodesSchema = new Schema({
	promocode: String,
	sall: Number,
	dateFrom: String,
	dateTo: String,
});

export default mongoose.models.Promocodes ||
	mongoose.model("Promocodes", promocodesSchema);
