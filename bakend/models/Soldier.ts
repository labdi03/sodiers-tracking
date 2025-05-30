import mongoose from "mongoose";

const SoldierSchema = new mongoose.Schema({
  id: { type: String, required: true }, // Matches ESP32 ID
  name: String,
  age: Number,
  grade: String,
  unit:String,
  bloodGroup: String,
});


export default mongoose.model("Soldier", SoldierSchema);
