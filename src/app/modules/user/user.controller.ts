import { RequestHandler } from "express";
import { userService } from "./user.service";
import { catchAsync } from "../../errors/catchAsync";
import httpStatus from "http-status";
import { globalResponse } from "../../libs/globalResponseHandler";

const createUser: RequestHandler = catchAsync(async (req, res) => {
  globalResponse(res, {
    status: httpStatus.CREATED,
    success: true,
    message: "user created",
    data: await userService.userCreate(req.body, req.file),
  });
});

export const userController = {
  createUser,
};
