import express, { urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import connectDB from "./utils/connectDB.js";
<<<<<<< HEAD
 
=======
<<<<<<< HEAD
>>>>>>> 8722ab1 (reslove merge)
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.js";
=======
const formidableMiddleware = require('express-formidable');
 
>>>>>>> daec244 (add multer)
const app = express();

dotenv.config();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
<<<<<<< HEAD
=======
app.use(formidableMiddleware());
>>>>>>> 8722ab1 (reslove merge)
connectDB();

app.use("/auth", authRoutes);
app.use("/blog", blogRoutes);
app.use("/comment", commentRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(process.env.PORT || 5000, () => {
  console.log("server running");
});
