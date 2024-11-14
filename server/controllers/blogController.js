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
    await blog.deleteOne();
    res.json({ message: "Blog deleted" });
  } catch (error) {
    console.log("delete blog controller error" + error.message);
    res.status(400).json({ error: error.message });
  }
};
