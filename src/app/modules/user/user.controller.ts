import { userService } from "./user.service";
import { catchAsync } from "../../errors/catchAsync";
import httpStatus from "http-status";
import { globalResponse } from "../../libs/globalResponseHandler";

const createUser = catchAsync(async (req, res) => {
  globalResponse(res, {
    status: httpStatus.CREATED,
    success: true,
    message: "user created",
    data: await userService.userCreate(req.body, req.file),
  });
});

const getProfile = catchAsync(async (req, res) => {
  const { email } = req.user;
  globalResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "profile retrieve successful",
    data: await userService.getMyProfile(email),
  });
});

const updateProfile = catchAsync(async (req, res) => {
  const { email } = req.user;
  globalResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "profile updated successful",
    data: await userService.updateMyProfile(email, req.body, req.file),
  });
});

const updateUserStatus = catchAsync(async (req, res) => {
  globalResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "user status updated successful",
    data: await userService.updateUserStatus(req.params.userEmail, req.body),
  });
});

export const userController = {
  createUser,
  getProfile,
  updateProfile,
  updateUserStatus,
};
