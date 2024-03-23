import { Router } from "express";
import { userController } from "./user.controller";
import { zodValidation } from "../../utils/globalValidation";
import { userValidation } from "./user.validation";

const userRouter = Router();

userRouter.post(
  "/create-user",
  zodValidation(userValidation.create),
  userController.createUser
);

export default userRouter;
