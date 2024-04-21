import httpStatus from "http-status";
import { catchAsync } from "../../errors/catchAsync";
import { globalResponse } from "../../libs/globalResponseHandler";
import { paymentService } from "./payment.service";

const createInit = catchAsync(async (req, res) => {
  globalResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Payment init successfully!",
    data: await paymentService.paymentIntent(req.params.appointmentId),
  });
});

const validationPaymentIntent = catchAsync(async (req, res) => {
  globalResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Payment validate successfully!",
    data: await paymentService.validatePayment(req.query),
  });
});

export const paymentController = {
  createInit,
  validationPaymentIntent,
};
