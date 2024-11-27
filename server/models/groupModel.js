import mongoose from "mongoose";

const groupSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  blogId: { type: String, required: true },
  admin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  moderators: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Moderators
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  joinRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "JoinRequest" }],
});

const Group = mongoose.model("Group", groupSchema);

export default Group;
