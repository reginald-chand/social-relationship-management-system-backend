import { config } from "dotenv";
import { createClient } from "redis";
import { logger } from "./logger.config.mjs";

config();

export const redisClient = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

try {
  await redisClient.connect();

  logger.log({
    level: "info",
    message: "Redis Server is successfully running.",
    additional: `port: ${process.env.REDIS_PORT}`,
  });
} catch (error) {
  logger.log({
    level: "error",
    message: "Could not start the Redis Server.",
    additional: error,
  });
}
