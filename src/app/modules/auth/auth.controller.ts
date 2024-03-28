import httpStatus from "http-status";
import { catchAsync } from "../../errors/catchAsync";
import { globalResponse } from "../../libs/globalResponseHandler";
import { authService } from "./auth.service";

const login = catchAsync(async (req, res) => {
  const { accessToken, refreshToken } = await authService.loginWithDB(req.body);

  res.cookie("refreshToken", refreshToken, {
    maxAge: 900000,
    httpOnly: true,
    sameSite: "none",
    secure: false,
  });
  globalResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "logged in successful",
    data: {
      accessToken,
    },
  });
});

const accessToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  globalResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "accessToken retrieve successfully",
    data: await authService.accessTokenFromRFT(refreshToken),
  });
});

const changePassword = catchAsync(async (req, res) => {
  const { email } = req.user;
  globalResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Password change successfully",
    data: await authService.userPasswordChange(email, req.body),
  });
});

const forgotPassword = catchAsync(async (req, res) => {
  globalResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Forgot password request successfully",
    data: await authService.userForgotPassword(req.body),
  });
});

const resetPassword = catchAsync(async (req, res) => {
  const token = req.headers?.authorization || "";
  globalResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Password reset successfully",
    data: await authService.resetPassword(token, req.body),
  });
});

export const authController = {
  login,
  accessToken,
  changePassword,
  forgotPassword,
  resetPassword,
};
