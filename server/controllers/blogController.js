import { InputFile } from "node-appwrite/file";
import Blog from "../models/blogModel.js";
import { Client, ID, Storage } from "node-appwrite";


const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6739d36c00223845ed29")
  .setSession(process.env.AppWrite_Api);

const storage = new Storage(client);
export const createBlog = async (req, res) => {
  try {
    const body = req.body;
    if (req.file) {
      const r = await storage.createFile(
        process.env.APPWRITE_BUCKET_ID || '',
        ID.unique(),
        InputFile.fromBuffer(
          req.file.buffer,
          req.file.originalname || 'name'
        )
      );
      const link = `https://cloud.appwrite.io/v1/storage/buckets/${process.env.APPWRITE_BUCKET_ID}/files/${r.$id}/view?project=${process.env.ProjectId}`
      const blog = new Blog({
        title: body.title,
        description: body.description,
        user: body.user,
        imageUrl: link,
        //  fileId: r.$id,  //not implemented
      });
      const newBlog = await blog.save();
      res.status(201).json(newBlog);
    }
    else {
      //if file not exist
      const blog = new Blog({
        title: body.title,
        description: body.description,
        user: body.user,
      });
      const newBlog = await blog.save();
      res.status(201).json(newBlog);
    }
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

    if (req.file) {
      if (blog.fileId) {
        const result = storage.deleteFile(process.env.APPWRITE_BUCKET_ID, blog.fileId)
      }
      const r = await storage.createFile(
        process.env.APPWRITE_BUCKET_ID || '',
        ID.unique(),
        InputFile.fromBuffer(
          req.file.buffer,
          req.file.originalname || 'name'
        )
      );
      const link = `https://cloud.appwrite.io/v1/storage/buckets/${process.env.APPWRITE_BUCKET_ID}/files/${r.$id}/view?project=${process.env.ProjectId}`
      blog.title = req.body.title || blog.title;
      blog.description = req.body.description || blog.description;
      blog.user = req.body.user || blog.user;
      blog.imageUrl = link || blog.imageUrl;
      //blog.fileId: r.$id,  //not implemented
    }
    else {
      blog.title = req.body.title || blog.title;
      blog.description = req.body.description || blog.description;
      blog.user = req.body.user || blog.user;
    }
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
    if (blog.fileId) {
      const result = storage.deleteFile(process.env.APPWRITE_BUCKET_ID, blog.fileId)
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
