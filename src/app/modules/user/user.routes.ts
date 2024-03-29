import { Router } from "express";
import { userController } from "./user.controller";
import { zodValidation } from "../../middlewares/globalValidation";
import { userValidation } from "./user.validation";
import { upload } from "../../utils/image";
import { auth } from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const userRouter = Router();

userRouter.post(
  "/create-user",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  upload.single("file"),
  (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  zodValidation(userValidation.create),
  userController.createUser
);

export default userRouter;
