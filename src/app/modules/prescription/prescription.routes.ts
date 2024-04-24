import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { prescriptionController } from "./prescription.controller";

const prescriptionRoutes = Router();

prescriptionRoutes.post(
  "/create-prescription",
  auth(UserRole.DOCTOR),
  prescriptionController.createPrescription
);

prescriptionRoutes.get(
  "/get-my-prescription",
  auth(UserRole.DOCTOR, UserRole.PATIENT, UserRole.SUPER_ADMIN, UserRole.ADMIN),
  prescriptionController.createPrescription
);

export default prescriptionRoutes;
