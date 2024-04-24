import httpStatus from "http-status";
import { catchAsync } from "../../errors/catchAsync";
import { globalResponse } from "../../libs/globalResponseHandler";
import { prescriptionService } from "./prescription.service";

const createPrescription = catchAsync(async (req, res) => {
  const { id } = req.user;
  globalResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Prescription created successfully!",
    data: await prescriptionService.insertScheduleIntoDB(id, req.body),
  });
});

const myPrescription = catchAsync(async (req, res) => {
  globalResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Prescription retrieve successfully!",
    data: await prescriptionService.getMyPrescriptionFromDB(req.user),
  });
});

export const prescriptionController = {
  createPrescription,
  myPrescription,
};
