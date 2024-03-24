import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { globalResponse } from "../../utils/globalResponseHandler";
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

export const authController = {
  login,
  accessToken,
};
