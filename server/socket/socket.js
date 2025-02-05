import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
const onlineUsers = {};
app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("joinRoom", (groupId) => {
    socket.join(groupId);
    console.log(`User joined room: ${groupId}`);
  });
  socket.on("register_admin", (adminId) => {
    onlineUsers[adminId] = socket.id;
    console.log(`Admin ${adminId} registered with socket ${socket.id}`);
  });
  socket.on("disconnect", () => {
    console.log("User disconnected");
    const adminId = Object.keys(onlineUsers).find(
      (key) => onlineUsers[key] === socket.id
    );
    if (adminId) delete onlineUsers[adminId];
    console.log(`User ${socket.id} disconnected`);
  });
});

export { app, server, io, onlineUsers };
