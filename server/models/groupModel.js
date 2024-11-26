import mongoose from "mongoose";

const groupSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  admin: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  moderators: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Moderators
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  joinRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "JoinRequest" }],
});

const Group = mongoose.model("Group", groupSchema);

export default Group;
