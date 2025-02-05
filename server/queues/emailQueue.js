import PQueue from "p-queue";
import { sendEmailWithQRCode } from "../utils/mail.js";

const emailQueue = new PQueue({ concurrency: 2 });

export const addEmailToQueue = async (attendanceId) => {
	emailQueue.add(() => sendEmailWithQRCode(attendanceId));

	console.log(`Email job added to queue for: ${attendanceId}`);
};
