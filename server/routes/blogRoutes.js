import express from "express";
import {
  createBlog,
  updateBlog,
  deleteBlog,
  getblogs,
  getBlogById,
} from "../controllers/blogController.js";

const router = express.Router();

router.route("/").post(createBlog);
router.route("/:id").put(updateBlog);
router.route("/:id").delete(deleteBlog);
router.route("/blogs").get(getblogs);
router.route("/:blogid").get(getBlogById);
export default router;
