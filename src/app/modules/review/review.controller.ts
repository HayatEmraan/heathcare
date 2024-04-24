import httpStatus from "http-status";
import { catchAsync } from "../../errors/catchAsync";
import { globalResponse } from "../../libs/globalResponseHandler";
import { reviewService } from "./review.service";

const createReview = catchAsync(async (req, res) => {
  const { id } = req.user;
  globalResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Review created successfully!",
    data: await reviewService.insertScheduleIntoDB(id, req.body),
  });
});

const myReview = catchAsync(async (req, res) => {
  globalResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Review retrieve successfully!",
    data: await reviewService.getMyReviewFromDB(req.user),
  });
});

export const reviewController = {
  createReview,
  myReview,
};
