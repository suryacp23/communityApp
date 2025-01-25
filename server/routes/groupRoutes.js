import { Router } from "express";
import {
  addModerator,
  approveRequest,
  createGroup,
  getGroupInfo,
  getGroupJoinRequests,
  getGroups,
  joinRequest,
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
router.post("/request", protect, joinRequest);
router.post("/approve", protect, approveRequest);
router.get("/request/:groupId", getGroupJoinRequests);

export default router;
