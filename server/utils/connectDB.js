import mongoose from "mongoose";
const connectDB = () => {
	mongoose
		.connect(process.env.MONGO_DB_URI)
		.then(() => {
			console.log("Database connected");
		})
		.catch((err) => {
			console.log(err);
		});
};

export default connectDB;
