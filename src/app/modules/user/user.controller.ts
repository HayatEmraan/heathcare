import { RequestHandler } from "express";
import { userService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";

const createUser: RequestHandler = catchAsync(async (req, res) => {
  res.send({
    msg: "user created",
    data: await userService.userCreate(req.body),
  });
});

export const userController = {
  createUser,
};
