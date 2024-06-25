import { csrfController } from "../controllers/auth/csrf.controller.mjs";
import express from "express";

import { connectionController } from "../controllers/connection/connection.controller.mjs";
import { userVerificationMiddleware } from "../middlewares/user.verification.middleware.mjs";

export const routes = express.Router();

routes.post(
  "/srms/connection",
  userVerificationMiddleware,
  connectionController
);

routes.get("/auth/csrf-token", csrfController);
