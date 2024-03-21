import { RequestHandler } from "express";
import { adminService } from "./admin.service";
import { catchAsync } from "../../utils/catchAsync";
import { pickQuery } from "./admin.utils";
import { pickFields } from "./admin.constant";

const retrieveAdmins: RequestHandler = catchAsync(async (req, res) => {
  const query = await pickQuery(req.query, pickFields);
  res.send({
    msg: "admins retrieved successfully",
    data: await adminService.retrieveAdminFromDB(query),
  });
});

const getAdminById: RequestHandler = catchAsync(async (req, res) => {
  res.send({
    msg: "admin retrieved successfully",
    data: await adminService.retrieveSingleAdminFromDB(req.params.id),
  });
});


const updateAdminById: RequestHandler = catchAsync(async (req, res) => {
  res.send({
    msg: "admin updated successfully",
    data: await adminService.updateSingleAdminFromDB(req.params.id, req.body),
  });
});


const deleteAdminById: RequestHandler = catchAsync(async (req, res) => {
  res.send({
    msg: "admin deleted successfully",
    data: await adminService.deleteSingleAdminFromDB(req.params.id),
  });
});




export const adminController = {
  retrieveAdmins,
  getAdminById,
  deleteAdminById,
  updateAdminById,
};
