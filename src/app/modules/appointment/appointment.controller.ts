import httpStatus from "http-status";
import { catchAsync } from "../../errors/catchAsync";
import { globalResponse } from "../../libs/globalResponseHandler";
import { appointmentService } from "./appointment.service";

const createAppointment = catchAsync(async (req, res) => {
  const { id } = req.user;
  globalResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Appointment created successfully!",
    data: await appointmentService.insertAppointmentIntoDB(id, req.body),
  });
});

const getMyAppointment = catchAsync(async (req, res) => {
  globalResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Appointment retrieve successfully!",
    data: await appointmentService.retrieveAppointmentFromDB(req.user),
  });
});

const getAllAppointment = catchAsync(async (req, res) => {
  globalResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Appointment are retrieves successfully!",
    data: await appointmentService.retrieveAllAppointmentFromDB(),
  });
});

const changeAppointmentStatus = catchAsync(async (req, res) => {
  globalResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Appointment status changed successfully!",
    data: await appointmentService.changeBookedAppointmentStatus(req.params.appointmentId, req.user, req.body.status),
  });
});

export const appointmentController = {
  createAppointment,
  getMyAppointment,
  getAllAppointment,
  changeAppointmentStatus,
};
