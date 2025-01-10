import express from "express";
import { createApplication } from "../controllers/applicationController.js";
const router = express.Router();

router.route("/apply").post(createApplication);

export default router;
