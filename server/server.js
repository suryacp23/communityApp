import express, { urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import groupRoutes from "./routes/groupRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import likeRoutes from "./routes/likeRoutes.js";
import connectDB from "./utils/connectDB.js";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.js";
import { app, server, io } from "./socket/socket.js";
import { connectRedis } from "./redis/redis.js";
import profileRoutes from "./routes/profileRoutes.js";

dotenv.config();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));

connectDB();
connectRedis();

app.get("/ping", (req, res) => {
  res.send("PONG");
});
app.use("/auth", authRoutes);
app.use("/events", eventRoutes);
app.use("/comment", commentRoutes);
app.use("/group", groupRoutes);
app.use("/message", messageRoutes);
app.use("/attendance", attendanceRoutes);
app.use("/applications", applicationRoutes);
app.use("/payment", paymentRoutes);
app.use("/profile", profileRoutes);
app.use("/like", likeRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

server.listen(process.env.PORT || 5000, () => {
  console.log(
    `server is running on http://localhost:${process.env.PORT || 5000}`
  );
});
