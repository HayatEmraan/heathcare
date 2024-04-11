import { RequestHandler } from "express";
import { catchAsync } from "../../errors/catchAsync";
import { pickQuery } from "./doctor.utils";
import { globalResponse } from "../../libs/globalResponseHandler";
import httpStatus from "http-status";
import { pickFields } from "./doctor.constant";
import { doctorService } from "./doctor.service";

const retrieveDoctors: RequestHandler = catchAsync(async (req, res) => {
  const query = await pickQuery(req.query, pickFields);
  const result = await doctorService.retrieveDoctorFromDB(query);
  globalResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "doctors retrieved successfully",
    data: result.data,
    meta: result.meta,
  });
});

const getDoctorById: RequestHandler = catchAsync(async (req, res) => {
  globalResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "doctor retrieved successfully",
    data: await doctorService.retrieveSingleDoctorFromDB(req.params.id),
  });
});

const updateDoctorById: RequestHandler = catchAsync(async (req, res) => {
  globalResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "doctor updated successfully",
    data: await doctorService.updateSingleDoctorFromDB(req.params.id, req.body),
  });
});

const deleteDoctorById: RequestHandler = catchAsync(async (req, res) => {
  globalResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "doctor deleted successfully",
    data: await doctorService.deleteSingleDoctorFromDB(req.params.id),
  });
});

export const doctorController = {
  retrieveDoctors,
  getDoctorById,
  deleteDoctorById,
  updateDoctorById,
};
