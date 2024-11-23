import Blog from "../models/blogModel.js";

export const createBlog = async (req, res) => {
  const blog = new Blog({
    title: req.body.title,
    description: req.body.description,
    user: req.body.user,
    imageUrl: req.body.imageUrl,
  });
  try {
    const newBlog = await blog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    console.log("Create blog controller error" + error.message);
    res.status(400).json({ error: error.message });
  }
};
export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog == null) {
      return res.status(404).json({ message: "Blog not found" });
    }
    if (req.body.user !== blog.user) {
      res
        .status(401)
        .json({ error: "unautorized you are not able to edit the blog" });
    }
    blog.title = req.body.title || blog.title;
    blog.description = req.body.description || blog.description;
    blog.user = req.body.user || blog.user;
    blog.imageUrl = req.body.imageUrl || blog.imageUrl;

    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } catch (error) {
    console.log("update blog controller error" + error.message);
    res.status(400).json({ error: error.message });
  }
};
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog == null) {
      return res.status(404).json({ message: "Blog not found" });
    }
    if (req.body.user !== blog.user) {
      return res
        .status(401)
        .json({ error: "unautorized you are not able to delete the blog" });
    }
    await blog.deleteOne();
    res.json({ message: "Blog deleted" });
  } catch (error) {
    console.log("delete blog controller error" + error.message);
    res.status(400).json({ error: error.message });
  }
};
export const getblogs = async (req, res) => {
  try {
    const blog = await Blog.find({}).populate("user", ["-password"]);
    if (blog == null) {
      return res.status(200).json({ message: " No blog Found" });
    }
    res.json({ blogs: blog });
  } catch (error) {
    console.log("getblogs  controller error" + error.message);
    res.status(400).json({ error: error.message });
  }
};
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.blogid).populate("user", [
      "-password",
    ]);
    if (blog == null) {
      return res.status(200).json({ message: " blog Not Found" });
    }
    res.json({ blog: blog });
  } catch (error) {
    console.log("getblogById  controller error" + error.message);
    res.status(400).json({ error: error.message });
  }
};
