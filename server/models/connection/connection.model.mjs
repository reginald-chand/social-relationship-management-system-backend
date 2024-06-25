import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true, ref: "User" },
});

const connectionSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  followings: [userSchema],
});

export const ConnectionModel = mongoose.model("Following", connectionSchema);
