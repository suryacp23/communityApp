import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";
import Payment from "../models/paymentModel.js";
import Group from "../models/groupModel.js";
dotenv.config();

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createOrder = async (req, res) => {
  try {
    const options = {
      amount: req.body.amount,
      currency: "INR",
      receipt: "receipt#1",
      payment_capture: 1,
    };
    console.log("hit");
    const order = await razorpayInstance.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const capturePayment = async (req, res) => {
  try {
    const { payment_id, amount } = req.body;

    const response = await razorpayInstance.payments.capture(
      payment_id,
      amount
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const verifyPayment = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    groupId,
    eventId,
  } = req.body;
  const userId = req.user._id;
  const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
  hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
  const generated_signature = hmac.digest("hex");

  if (generated_signature === razorpay_signature) {
    const payment = new Payment({
      groupId,
      userId,
      eventId,
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
    });

    await payment.save();
    res.status(200).json({ message: "Payment verified successfully" });
  } else {
    res.status(400).json({ message: "Payment verification failed" });
  }
};

export const verifyEventApplied = async (req, res) => {
  const { eventId } = req.params;
  try {
    const events = await Payment.find({
      eventId: eventId,
      userId: req.user._id,
    })
      .select("groupId")
      .populate("groupId", "name")
      .lean();

    const groupIds = events.map((event) => event.groupId);
    res.status(200).json({ groupIds });
  } catch (error) {
    console.log(error);
  }
};
