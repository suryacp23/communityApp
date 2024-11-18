import { InputFile } from "node-appwrite/file";
import Blog from "../models/blogModel.js";
const sdk = require('node-appwrite');

const client = new sdk.Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
  .setProject("6739d36c00223845ed29") // Your project ID
  .setSession(process.env.AppWrite_Api); // The user session to authenticate with

const storage = new sdk.Storage(client);
export const createBlog = async (req, res) => {
  const r = await storage.createFile(
    process.env.APPWRITE_BUCKET_ID || '',
    sdk.ID.unique(),
    sdk.InputFile.fromBuffer(
      req.file?.buffer,
      req.file?.filename || 'name'
    )
  );
  storage.getFilePreview(process.env.APPWRITE_BUCKET_ID, r.$id)
  const blog = new Blog({
    title: fields.title,
    description: fields.description,
    user: fields.user,
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
export const getblogs = async (req, res) => {
  try {
    const blog = await Blog.find({}).populate("user", ["-password"]);
    if (blog == null) {
      return res.status(200).json({ message: " No blog Found" });
    }
    res.json({ blogs: blog })
  } catch (error) {
    console.log("getblogs  controller error" + error.message);
    res.status(400).json({ error: error.message })
  }
}
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.blogid).populate("user", ["-password"]);
    if (blog == null) {
      return res.status(200).json({ message: " blog Not Found" });
    }
    res.json({ blog: blog })
  } catch (error) {
    console.log("getblogById  controller error" + error.message);
    res.status(400).json({ error: error.message })
  }
}
