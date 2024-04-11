import { RequestHandler } from "express";
import { catchAsync } from "../../errors/catchAsync";
import { pickQuery } from "./patient.utils";
import { globalResponse } from "../../libs/globalResponseHandler";
import httpStatus from "http-status";
import { pickFields } from "./patient.constant";
import { patientService } from "./patient.service";

const retrievePatients: RequestHandler = catchAsync(async (req, res) => {
  const query = await pickQuery(req.query, pickFields);
  const result = await patientService.retrievePatientFromDB(query);
  globalResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "patients retrieved successfully",
    data: result.data,
    meta: result.meta,
  });
});

const getPatientById: RequestHandler = catchAsync(async (req, res) => {
  globalResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "patient retrieved successfully",
    data: await patientService.retrieveSinglePatientFromDB(req.params.id),
  });
});

const updatePatientById: RequestHandler = catchAsync(async (req, res) => {
  globalResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "patient updated successfully",
    data: await patientService.updateSinglePatientFromDB(req.params.id, req.body),
  });
});

const deletePatientById: RequestHandler = catchAsync(async (req, res) => {
  globalResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "patient deleted successfully",
    data: await patientService.deleteSinglePatientFromDB(req.params.id),
  });
});

export const patientController = {
  retrievePatients,
  getPatientById,
  deletePatientById,
  updatePatientById,
};
