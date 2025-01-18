import Redis from "redis";

export const redisClient = Redis.createClient({
	host: "localhost",
	port: 6379,
});
redisClient.on("error", (err) => console.error("Redis Client Error:", err));
export const connectRedis = async () => {
	redisClient.connect().then(() => {
		console.log("redis connected");
	});
};
