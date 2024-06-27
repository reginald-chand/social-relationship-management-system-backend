import { ConnectionModel } from "../../models/connection/connection.model.mjs";
import { connectionControllerValidator } from "../../validators/connection/connection.controller.validator.mjs";
import { logger } from "../../configs/logger.config.mjs";
import mongoose from "mongoose";

export const connectionController = async (request, response) => {
  const { error, value } = connectionControllerValidator.validate(request.body);

  if (error) {
    return response.status(400).json({ responseMessage: error.message });
  }

  const { userName, userData } = value;

  try {
    const database = mongoose.connection.db;

    const existingUser = await database
      .collection("users")
      .findOne({ userName: { $eq: userName } });

    if (existingUser === null || !existingUser) {
      return response.status(404).json({ responseMessage: "User not found." });
    }

    const existingFollowings = await ConnectionModel.aggregate([
      { $match: { "followings.userName": userName } },
      { $unwind: "$followings" },
      { $match: { "followings.userName": userName } },
      { $project: { userName: userName } },
    ]);

    const foundFollowedUser = existingFollowings.some(
      (followedUser) => userName === followedUser.userName
    );

    if (foundFollowedUser) {
      await ConnectionModel.findOneAndUpdate(
        { _id: { $eq: userData.id } },
        { $pull: { followings: { userName: userName } } },
        { new: true, upsert: true }
      );

      await database
        .collection("followers")
        .findOneAndUpdate(
          { _id: { $eq: existingUser._id } },
          { $pull: { followers: { userName: userData.userName } } },
          { new: true, upsert: true }
        );

      return response
        .status(200)
        .json({ responseMessage: `Successfully un-followed ${userName}` });
    }

    await ConnectionModel.findOneAndUpdate(
      { _id: { $eq: userData.id } },
      { $push: { followings: { userName: userName } } },
      { new: true, upsert: true }
    );

    await database
      .collection("followers")
      .findOneAndUpdate(
        { _id: { $eq: existingUser._id } },
        { $push: { followers: { userName: userData.userName } } },
        { new: true, upsert: true }
      );

    return response
      .status(200)
      .json({ responseMessage: `Successfully followed ${userName}` });
  } catch (error) {
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
