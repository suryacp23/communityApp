import { Router } from "express";
import {
  addModerator,
  approveRequest,
  joinRequest,
} from "../controllers/groupController.js";
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin, isAdminOrModerator } from "../middleware/authGroup.js";

const router = Router();

router.post("/join", protect, joinRequest);
router.post("/approve", protect, isAdminOrModerator, approveRequest);
router.post("/addModerator", protect, isAdmin, addModerator);

export default router;
