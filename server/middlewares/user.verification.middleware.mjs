import jwt from "jsonwebtoken";
import { logger } from "../configs/logger.config.mjs";

export const userVerificationMiddleware = async (request, response, next) => {
  const accessToken = request.headers.authorization;

  if (!accessToken) {
    return response.status(401).json({ responseMessage: "Token not found." });
  }

  try {
    const verifiedUserData = jwt.verify(
      accessToken,
      process.env.JWT_SECRET_KEY
    );

    if (!verifiedUserData) {
      return response.status(401).json({ responseMessage: "UnAuthorized." });
    }

    request.body = { ...request.body, userData: verifiedUserData };
    next();
  } catch (error) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError" ||
      error.name === "NotBeforeError"
    ) {
      logger.log({ level: "error", message: error.message });
      return response.status(401).json({ responseMessage: error.message });
    }

    logger.log({
      level: "error",
      message: error,
      additional: "Internal server error.",
    });

    return response.status(500).json({
      responseMessage: "Internal server error.",
    });
  }
};
