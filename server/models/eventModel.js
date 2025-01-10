import mongoose from "mongoose";

const eventSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		imageUrl: {
			type: String,
			required: true,
		},
		comments: {
			type: Number,
			default: 0,
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		eventDate: {
			type: Date,
		},
		startTime: {
			type: Date,
		},
		endTime: {
			type: Date,
		},
		technical: { type: [] },
		nonTechnical: { type: [] },
		fileId: {
			type: String,
		},
		paid: {
			type: Boolean,
			default: true,
		},
		amount: Number,
		likes: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);

export default Event;
