/* import Queue from "bull";
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
	console.error(`Job failed for applicationId: ${job.data.applicationId}`, err);
});
 */

import Queue from "p-queue";
import Application from "../models/applicationModel.js";
const queue = new Queue({ concurrency: 5 });

export const addAttendanceToQueue = async (applicationId) => {
	queue.add(() => updateAttendance(applicationId));
};

const updateAttendance = async (applicationId) => {
	const res = await Application.findByIdAndUpdate(
		applicationId,
		{ isAttended: true },
		{ new: true }
	);
	console.log(`attendance updated for ${res}`);
};
