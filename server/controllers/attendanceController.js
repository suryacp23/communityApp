import Application from "../models/applicationModel.js";
import mongoose from "mongoose";
import { redisClient } from "../redis/redis.js";

export const getAttendance = async (req, res) => {
	try {
		const { eventId } = req.params;
		const attendances = await Application.aggregate([
			// Step 1: Lookup (populate) the `eventId` field from the `events` collection
			{
				$match: {
					eventId: new mongoose.Types.ObjectId(eventId), // Filter by eventId
				},
			},
			{
				$lookup: {
					from: "events", // Collection for events
					localField: "eventId", // Field in Attendance
					foreignField: "_id", // Field in Events
					as: "event",
				},
			},
			// Step 2: Unwind the `event` array
			{
				$unwind: {
					path: "$event",
					preserveNullAndEmptyArrays: true,
				},
			},
			// Step 3: Lookup (populate) the `userId` field from the `users` collection
			{
				$lookup: {
					from: "users", // Collection for users
					localField: "userId", // Field in Attendance
					foreignField: "_id", // Field in Users
					as: "user",
				},
			},
			// Step 4: Unwind the `user` array
			{
				$unwind: {
					path: "$user",
					preserveNullAndEmptyArrays: true,
				},
			},
			// Step 7: Project only the required fields
			{
				$project: {
					_id: 1, // Attendance ID
					userName: "$user.userName", // User's name
					isAttended: "$isAttended",
				},
			},
		]);
		console.log(attendances);
		const redisData = attendances.reduce((acc, item) => {
			const { _id, ...remainingData } = item;
			acc[_id] = JSON.stringify(remainingData);
			return acc;
		}, {});
		console.log(redisData);
		setAllEventInRedis(eventId, redisData);
		res.status(200).json({
			data: redisData,
			message: "Fetched data successfully",
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: "Failed to fetch attendance data",
			error: error.message,
			success: false,
		});
	}
};

export const updateAttendance = async (req, res) => {
	try {
		const { eventId, applicationId } = req.body;

		// Validate inputs
		if (!eventId || !applicationId) {
			return res.status(400).json({ message: "Invalid data" });
		}

		// Get data from Redis for the event
		const key = `event:${eventId}`;
		const userData = await redisClient.hGet(key, applicationId);

		if (!userData) {
			return res
				.status(404)
				.json({ message: "User not found for this event" });
		}

		// Parse user data and update `isAttended`
		const updatedData = JSON.parse(userData);
		updatedData.isAttended = true;

		// Save the updated data back to Redis
		await redisClient.hSet(key, applicationId, JSON.stringify(updatedData));

		// Respond with updated data
		return res.status(200).json({
			message: "Attendance updated successfully",
			data: updatedData,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};
export const closeAttendance = async (req, res) => {
	try {
		const { eventId } = req.body;

		if (!eventId) {
			return res.status(400).json({ message: "Event ID is required" });
		}

		const key = `event:${eventId}`;
		const attendanceData = await redisClient.hGetAll(key);

		if (!attendanceData) {
			return res
				.status(404)
				.json({ message: "No data found for this event" });
		}
		console.log(attendanceData);
		// Parse Redis data and save to MongoDB
		const updates = Object.entries(attendanceData).map(
			async ([userId, userData]) => {
				const parsedData = JSON.parse(userData);
				return Application.findByIdAndUpdate(
					userId,
					{ isAttended: parsedData.isAttended },
					{ new: true }
				);
			}
		);

		await Promise.all(updates);

		// Delete data from Redis after transferring to MongoDB
		await redisClient.del(key);

		return res.status(200).json({
			message: "Attendance data saved to MongoDB and cleared from Redis.",
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

async function setAllEventInRedis(eventId, attendanceData) {
	try {
		const redisKey = `event:${eventId}`; // Unique key for the event

		// Save each item to the Redis hash
		for (const [id, value] of Object.entries(attendanceData)) {
			const result = await redisClient.hSet(redisKey, id, value); // Use `hSet` to store key-value in hash
			console.log(`HSET Result: ${result}`);
		}

		// Optional: Set expiration for the hash (e.g., 7 days)
		await redisClient.expire(redisKey, 7 * 24 * 60 * 60); // 7 days in seconds

		console.log(`Attendance data for event ${eventId} saved to Redis.`);
	} catch (error) {
		console.error("Error saving event data to Redis:", error.message);
	}
}
async function getAllEventFromRedis(eventId) {
	try {
		const redisKey = `event:${eventId}`;

		// Retrieve all attendance data for the event
		const attendanceHash = await redisClient.hGetAll(redisKey);

		// Parse JSON strings into objects
		const attendanceData = Object.entries(attendanceHash).map(
			([id, value]) => {
				const parsedValue = JSON.parse(value);
				return {
					id, // ID as the key
					userName: parsedValue.userName,
					isAttended: parsedValue.isAttended,
				};
			}
		);

		console.log(`Attendance data for event ${eventId}:`, attendanceData);
		return attendanceData;
	} catch (error) {
		console.error("Error retrieving event data from Redis:", error.message);
	}
}
