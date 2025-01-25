import { Router } from "express";
import {
    capturePayment,
  createOrder,
  verifyPayment,
} from "../controllers/paymentControllers.js";

const router = Router();

router.post("/create-order", createOrder);
router.post("/capture-payment", capturePayment);
router.post("/verify-payment", verifyPayment);

export default router;
