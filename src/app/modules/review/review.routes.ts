import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { reviewController } from "./review.controller";

const reviewRoutes = Router();

reviewRoutes.post(
  "/create-review",
  auth(UserRole.PATIENT),
  reviewController.createReview
);

reviewRoutes.get(
  "/get-my-review",
  auth(UserRole.DOCTOR, UserRole.PATIENT, UserRole.SUPER_ADMIN, UserRole.ADMIN),
  reviewController.myReview
);

export default reviewRoutes;
