import { Router } from "express";
import { zodValidation } from "../../middlewares/globalValidation";
import { doctorValidation } from "./doctor.validation";
import { auth } from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { doctorController } from "./doctor.controller";

const doctorRoutes = Router();

doctorRoutes.get(
  "/get-doctors",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  doctorController.retrieveDoctors
);

doctorRoutes.get("/get-doctor/:id", doctorController.getDoctorById);

doctorRoutes.delete("/delete-doctor/:id", doctorController.deleteDoctorById);

doctorRoutes.patch(
  "/update-doctor/:id",
  zodValidation(doctorValidation.update),
  doctorController.updateDoctorById
);

export default doctorRoutes;
