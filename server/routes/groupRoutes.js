import { Router } from "express";
import {
  addModerator,
  approveRequest,
  createGroup,
  joinRequest,
} from "../controllers/groupController.js";
import protect from "../middleware/protect.js";
import {
  isAdminOrModerator,
  isAdmin,
} from "../middleware/isAdminOrModerator.js";

const router = Router();

router.post("/create", isAdmin, createGroup);
router.post("/join", protect, joinRequest);
router.post("/approve", isAdminOrModerator, approveRequest);
router.post("/addModerator", isAdmin, addModerator);

export default router;
