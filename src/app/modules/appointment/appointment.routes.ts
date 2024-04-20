import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { appointmentController } from "./appointment.controller";

const appointmentRoutes = Router();

appointmentRoutes.post(
  "/create-appointment",
  auth(UserRole.PATIENT),
  appointmentController.createAppointment
);

export default appointmentRoutes;
