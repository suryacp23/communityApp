import express, { urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import groupRoutes from "./routes/groupRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import likeRoutes from "./routes/likeRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

import connectDB from "./utils/connectDB.js";
import { connectRedis } from "./redis/redis.js";
import swaggerDocument from "./swagger.js";
import { app, server, io } from "./socket/socket.js";
import logger from "./utils/logger.js";

dotenv.config();

// Middleware Setup
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));

connectDB();
connectRedis();

// 🌈 Morgan - Custom Console Logger
app.use(
  morgan(
    (tokens, req, res) => {
      return [
        `URL: ${tokens.url(req, res)}`,
        `METHOD: ${tokens.method(req, res)}`,
        `STATUS: ${tokens.status(req, res)}`,
        `RESPONSE TIME: ${tokens["response-time"](req, res)} ms`,
        `MESSAGE: Request handled successfully!`,
      ].join(" | ");
    },
    { stream: { write: (message) => logger.info(message.trim()) } }
  )
);

// Routes
app.get("/ping", (req, res) => {
  logger.info("Ping request received");
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
app.use("/admin", express.static(path.join(__dirname, "admin")));
app.use("/api/admin", adminRoutes);

// Error Handling
app.use((err, req, res, next) => {
  logger.error(`Error: ${err.message}`);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start Server
server.listen(process.env.PORT || 5000, () => {
  logger.info(
    `🚀 Server running on http://localhost:${process.env.PORT || 5000}`
  );
});
