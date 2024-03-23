import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { globalResponse } from "../../utils/globalResponseHandler";
import { authService } from "./auth.service";

const login = catchAsync(async (req, res) => {
  globalResponse(res, {
    status: httpStatus.OK,
    message: "logged in successful",
    data: authService.loginWithDB,
  });
});

export const authController = {
  login,
};
