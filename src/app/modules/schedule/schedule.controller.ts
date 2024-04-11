import httpStatus from "http-status";
import { catchAsync } from "../../errors/catchAsync";
import { globalResponse } from "../../libs/globalResponseHandler";
import { scheduleService } from "./schedule.service";

const createSchedule = catchAsync(async (req, res) => {
  globalResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Schedule created successfully!",
    data: await scheduleService.insertScheduleIntoDB(),
  });
});

export const scheduleController = {
  createSchedule,
};
