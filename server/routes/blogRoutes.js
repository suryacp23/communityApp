import express from "express";
import {
	createBlog,
	updateBlog,
	deleteBlog,
	getblogs,
	getBlogById,
} from "../controllers/blogController.js";
import multer from "multer";

import protect from "../middleware/protect.js";

const router = express.Router();
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

//router.route("/").post(createBlog);
router.post("/", upload.single("file"), createBlog);
//router.route("/:id").put(updateBlog);
router.put("/:id", upload.single("file"), updateBlog);
router.route("/:id").delete(deleteBlog);
router.route("/blogs").get(getblogs);
router.route("/:blogid").get(getBlogById);
export default router;
