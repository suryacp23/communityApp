import express from "express";
import {
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController.js";

const router = express.Router();

router.route("/").post(createBlog);
router.route("/:id").put(updateBlog);
router.route("/:id").delete(deleteBlog);

export default router;
