import mongoose from "mongoose";

const Schema = mongoose.Schema;

const recoverSchema = new Schema({
	email: String,
	pin: String,
});

export default mongoose.models.Recover ||
	mongoose.model("Recover", recoverSchema);
