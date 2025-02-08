import Redis from "redis";
import logger from "../utils/logger.js";
import dotenv from "dotenv";
dotenv.config();

// Redis URL from environment variable (Internal Redis URL on Render)
const redisUrl = process.env.REDIS_URL;
console.log("Connecting to Redis at:", redisUrl);

// Create Redis client (No TLS since it's an internal connection)
export const redisClient = Redis.createClient({
  url: redisUrl,
  socket: {
    reconnectStrategy: (retries) => {
      logger.warn(`Reconnecting to Redis... Attempt #${retries}`);
      return Math.min(retries * 100, 3000); // Retry with backoff strategy
    },
  },
});

// Handle Redis errors
redisClient.on("error", (err) => logger.error("❌ Redis Client Error:", err));

// Async function to connect to Redis
export const connectRedis = async () => {
  try {
    await redisClient.connect();
    logger.info("✅ Redis connected successfully");
  } catch (error) {
    logger.error("❌ Failed to connect to Redis:", error);
    process.exit(1); // Exit if Redis fails to connect
  }
};
