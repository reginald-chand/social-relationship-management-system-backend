import { RedisStore } from "rate-limit-redis";
import { rateLimit } from "express-rate-limit";
import { redisClient } from "../configs/redis.client.config.mjs";

export const rateLimitMiddleware = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,

  store: new RedisStore({
    sendCommand: (...args) => redisClient.sendCommand(args),
    expiry: 60 * 60 * 1000,
    resetExpiryOnChange: true,
  }),
});
