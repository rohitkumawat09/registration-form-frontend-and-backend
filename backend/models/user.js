import { model } from "mongoose";
import mongoose from "mongoose";
import "dotenv/config";

const DetailSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  dob: { type: String },
  gender: { type: String },
  friendName: { type: String },

  parentName: { type: String },
  parentPhone: { type: Number },
  localAddress: { type: String },
  permanentAddress: { type: String },
  sameAddress: { type: Boolean, default: false },
  status: { type: String, default: "Student" },
  qualification: { type: String },
  year: { type: String },
  college: { type: String },
  course: { type: String },
  source: { type: String, default: "Google" },
  agreed: { type: Boolean, default: false },
});

const DetailModel = mongoose.model("detail", DetailSchema);
export default DetailModel;
