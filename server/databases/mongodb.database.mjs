import { logger } from "../configs/logger.config.mjs";
import mongoose from "mongoose";

export const mongodbDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_CONNECTION_URL);

    logger.log({
      level: "info",
      message: "Connection to the database has been successfully established.",
      additional: `database: MongoDB`,
    });
  } catch (error) {
    logger.log({
      level: "error",
      message: "Could not connect to MongoDB database.",
      additional: error,
    });
  }
};
