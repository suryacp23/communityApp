import Comment from "../models/commentModel.js";
export const createComment = async (req, res, next) => {
  try {
    const { comment, blog, user } = req.body;
    const newComment = new Comment({
      comment,
      blog,
      user,
    });
    await newComment.save();
    res.status(200).json(newComment);
  } catch (error) {
    console.log("createComment controller error" + error.message);
    res.status(400).json({ error: error.message });
  }
};
export const getPostComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ blogId: req.params.blogId })
      .sort({
        createdAt: -1,
      })
      .populate("user", ["-password"]);
    res.status(200).json(comments);
  } catch (error) {
    console.log("getpostComment controller error" + error.message);
    res.status(400).json({ error: error.message });
  }
};
