import Redis from "redis";
import logger from "../utils/logger.js";

// Redis URL from environment variable (Render provides this)
const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";

// Create Redis client with proper configuration
export const redisClient = Redis.createClient({
  url: redisUrl,
  socket: redisUrl.startsWith("rediss://")
    ? {
        tls: true,
        rejectUnauthorized: false, // Required for self-signed certificates
      }
    : {},
});

// Handle Redis errors
redisClient.on("error", (err) => logger.error("Redis Client Error:", err));

// Async function to connect Redis
export const connectRedis = async () => {
  try {
    await redisClient.connect();
    logger.info("✅ Redis connected successfully");
  } catch (error) {
    logger.error("❌ Failed to connect to Redis:", error);
    process.exit(1); // Exit the process if Redis fails to connect
  }
};
