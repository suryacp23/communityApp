import { Router } from "express";
import {
  addModerator,
  approveRequest,
  createGroup,
  joinRequest,
  getGroupInfo,
} from "../controllers/groupController.js";
import protect from "../middleware/protect.js";
import {
  isAdminOrModerator,
  isAdmin,
} from "../middleware/isAdminOrModerator.js";

const router = Router();

router.post("/create", protect, isAdmin, createGroup);
router.post("/join", protect, joinRequest);
router.post("/approve", protect, isAdminOrModerator, approveRequest);
router.post("/addModerator", protect, isAdmin, addModerator);
router.get("/:groupId", getGroupInfo);

export default router;
