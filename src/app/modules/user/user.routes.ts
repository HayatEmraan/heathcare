import { Router } from "express";
import { userController } from "./user.controller";
import { zodValidation } from "../../middlewares/globalValidation";
import { userValidation } from "./user.validation";
import { upload } from "../../utils/image";
import { auth } from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { userUtils } from "./user.utils";

const userRouter = Router();

userRouter.post(
  "/create-user",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  upload.single("file"),
  userUtils.bodyParse,
  zodValidation(userValidation.create),
  userController.createUser
);

userRouter.get(
  "/me",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.PATIENT, UserRole.DOCTOR),
  userController.getProfile
);

userRouter.patch(
  "/update-profile",
  upload.single("file"),
  userUtils.bodyParse,
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.PATIENT, UserRole.DOCTOR),
  userController.updateProfile
);



userRouter.patch(
  "/update-user-status/:userEmail",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  zodValidation(userValidation.updateStatus),
  userController.updateUserStatus
);
export default userRouter;
