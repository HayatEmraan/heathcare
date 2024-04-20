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
    data: await appointmentService.insertScheduleIntoDB(id, req.body),
  });
});

export const appointmentController = {
  createAppointment,
};
