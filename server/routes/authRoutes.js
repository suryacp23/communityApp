import express from "express";
import { login, logout, signUp } from "../controllers/authController.js";

const router = express.Router();

router.route("/signup").post(signUp);
router.route("/login").post(login);
router.route("/logout").post(logout);

export default router;
