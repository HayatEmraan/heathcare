import { RequestHandler } from "express";
import { adminService } from "./admin.service";
import { catchAsync } from "../../utils/catchAsync";
import { pickQuery } from "./admin.utils";
import { pickFields } from "./admin.constant";
import { globalResponse } from "../../utils/globalResponseHandler";
import httpStatus from "http-status";

const retrieveAdmins: RequestHandler = catchAsync(async (req, res) => {
  const query = await pickQuery(req.query, pickFields);
  const result = await adminService.retrieveAdminFromDB(query);
  globalResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "admins retrieved successfully",
    data: result.data,
    meta: result.meta,
  });
});

const getAdminById: RequestHandler = catchAsync(async (req, res) => {
  globalResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "admin retrieved successfully",
    data: await adminService.retrieveSingleAdminFromDB(req.params.id),
  });
});

const updateAdminById: RequestHandler = catchAsync(async (req, res) => {
  globalResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "admin updated successfully",
    data: await adminService.updateSingleAdminFromDB(req.params.id, req.body),
  });
});

const deleteAdminById: RequestHandler = catchAsync(async (req, res) => {
  globalResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "admin deleted successfully",
    data: await adminService.deleteSingleAdminFromDB(req.params.id),
  });
});

export const adminController = {
  retrieveAdmins,
  getAdminById,
  deleteAdminById,
  updateAdminById,
};
