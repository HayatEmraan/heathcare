import { RequestHandler } from "express";
import { adminService } from "./admin.service";
import { catchAsync } from "../../utils/catchAsync";
import { pickQuery } from "./admin.utils";
import { pickFields } from "./admin.constant";

const retrieveAdmins: RequestHandler = catchAsync(async (req, res) => {
  const query = await pickQuery(req.query, pickFields);
  res.send({
    msg: "admins retrieved",
    data: await adminService.retrieveAdminFromDB(query),
  });
});

export const adminController = {
  retrieveAdmins,
};
