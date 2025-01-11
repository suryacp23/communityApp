import mongoose from "mongoose";

const groupSchema = mongoose.Schema(
	{
		name: { type: String, required: true },
		description: String,
		eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
		admin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		moderators: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Moderators
		members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
	},
	{
		timestamps: true,
	}
);

const Group = mongoose.model("Group", groupSchema);

export default Group;
