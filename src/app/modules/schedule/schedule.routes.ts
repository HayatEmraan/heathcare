import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { scheduleController } from "./schedule.controller";

const scheduleRoutes = Router();

scheduleRoutes.post(
  "/create-schedule",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.DOCTOR),
  scheduleController.createSchedule
);

export default scheduleRoutes;
