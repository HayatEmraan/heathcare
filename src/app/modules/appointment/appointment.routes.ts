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

appointmentRoutes.get(
  "/my-appointment",
  auth(UserRole.DOCTOR, UserRole.PATIENT),
  appointmentController.getMyAppointment
);

appointmentRoutes.get(
  "/get-all-appointment",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  appointmentController.getAllAppointment
);

appointmentRoutes.patch(
  "/change-status/:appointmentId",
  auth(UserRole.DOCTOR, UserRole.ADMIN, UserRole.SUPER_ADMIN),
  appointmentController.changeAppointmentStatus
);

export default appointmentRoutes;
