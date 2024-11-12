import express, { urlencoded } from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./utils/connectDB.js";
const app = express();

dotenv.config();

app.use(express.json());
app.use(urlencoded({ extended: true }));

connectDB();

app.use("/auth", authRoutes);

app.listen(process.env.PORT || 5000, () => {
	console.log("server running");
});
