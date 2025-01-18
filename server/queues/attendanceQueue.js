import Queue from "bull";
import Attendance from "../models/applicationModel.js";
export const attendanceQueue = new Queue("attendanceQueue");
attendanceQueue.process(async (job) => {
	const { applicationId } = job.data;
	await Attendance.updateOne({ _id: applicationId }, { isAttended: true });
	console.log(`attendance updated for ${applicationId}`);
});

attendanceQueue.on("error", (err) => {
	console.error("Queue error:", err);
});

attendanceQueue.on("completed", (job) => {
	console.log(`Job completed for applicationId: ${job.data.applicationId}`);
});

attendanceQueue.on("failed", (job, err) => {
	console.error(
		`Job failed for applicationId: ${job.data.applicationId}`,
		err
	);
});
