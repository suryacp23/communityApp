import { Router } from "express";
import {
	addModerator,
	createGroup,
	getGroupInfo,
	getGroups,
} from "../controllers/groupController.js";
import protect from "../middleware/protect.js";
import {
	isAdminOrModerator,
	isAdmin,
} from "../middleware/isAdminOrModerator.js";

const router = Router();

router.post("/create", protect, isAdmin, createGroup);
router.post("/addModerator", protect, isAdmin, addModerator);
router.get("/:groupId", getGroupInfo);
router.get("/", protect, getGroups);

export default router;
