import { createLogger, format, transports } from "winston";
import chalk from "chalk";
import path from "path";
import fs from "fs";

const { combine, timestamp, printf } = format;

const logDir =
	process.env.NODE_ENV === "production" ? "/tmp/logs" : path.join(process.cwd(), "logs");

// Ensure the logs directory exists
// const logDir = path.join(process.cwd(), "logs");
if (!fs.existsSync(logDir)) {
	fs.mkdirSync(logDir);
}
// const logFilePath = path.join(logDir, "server.log");

const consoleFormat = printf(({ level, message, timestamp }) => {
	// Regex Patterns
	const methodRegex = /METHOD:\s(\w+)/;
	const statusRegex = /STATUS:\s(\d{3})/;
	const urlRegex = /URL:\s(\/[^\s]*)/;
	const responseTimeRegex = /RESPONSE TIME:\s([\d.]+ ms)/;

	// Extracting Parts
	const methodMatch = message.match(methodRegex);
	const statusMatch = message.match(statusRegex);
	const urlMatch = message.match(urlRegex);
	const responseTimeMatch = message.match(responseTimeRegex);

	// Apply Colors
	const coloredMethod = methodMatch ? `${chalk.blue.bold(methodMatch[1])}` : "";
	const coloredStatus = statusMatch
		? `${
				parseInt(statusMatch[1]) >= 500
					? chalk.red.bold(statusMatch[1])
					: parseInt(statusMatch[1]) >= 400
					? chalk.yellow.bold(statusMatch[1])
					: chalk.green.bold(statusMatch[1])
		  }`
		: "";
	const coloredURL = urlMatch ? `${chalk.magenta.bold(urlMatch[1])}` : "";
	const coloredResponseTime = responseTimeMatch ? `${chalk.redBright(responseTimeMatch[1])}` : "";

	// Final Colored Message
	const coloredMessage = [coloredMethod, coloredStatus, coloredURL, coloredResponseTime]
		.filter(Boolean)
		.join("  ");

	// ✅ Fallback for non-request messages (like server start)
	return `${chalk.gray(timestamp)} [${level.toUpperCase()}]: ${
		coloredMessage || chalk.whiteBright(message)
	}`;
});

// Plain Text Format for File
const fileFormat = printf(({ level, message, timestamp }) => {
	return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

const logger = createLogger({
	level: "info",
	format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" })),
	transports: [
		new transports.Console({ format: consoleFormat }), // Colored console logs
		new transports.File({
			filename: path.join(logDir, "app.log"),
			format: fileFormat,
		}),
	],
});

export default logger;
