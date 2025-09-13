import mongoose from "mongoose";

const User = new mongoose.Schema(
  {
    userName: String,
    email: { type: String, require: true },
    password: { type: String, require: true },
    role: { type: String, default: "user" },
    refreshToken: { type: String, default: null },
  },
  { timestamps: true }
);

export default mongoose.model("Users", User);
