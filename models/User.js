import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  questions: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Question" }
  ]
});
export default mongoose.model("User", userSchema);
