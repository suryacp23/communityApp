import express from "express";
import {
	createBlog,
	updateBlog,
	deleteBlog,
	getblogs,
	getBlogById,
} from "../controllers/blogController.js";

import protect from "../middleware/protect.js";

const router = express.Router();

router.route("/").post(createBlog);
router.route("/:id").put(protect, updateBlog);
router.route("/:id").delete(protect, deleteBlog);
router.route("/blog").get(getblogs);
router.route("/:blogid").get(getBlogById);
export default router;
