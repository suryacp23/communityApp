import mongoose from "mongoose";

const blogSchema = mongoose.Schema(
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
		comments: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Comment",
			},
		],
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		fileId: {
			type: String,
		},
	},
	{ timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
