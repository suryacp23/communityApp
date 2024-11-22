import express, { urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import connectDB from "./utils/connectDB.js";
 
import cookieParser from "cookie-parser";
const app = express();

dotenv.config();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
connectDB();

app.use("/auth", authRoutes);
app.use("/blog", blogRoutes);

app.listen(process.env.PORT || 5000, () => {
	console.log("server running");
});
