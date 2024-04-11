import { catchAsync } from "../../errors/catchAsync";

const bodyParse = catchAsync(async (req, res, next) => {
  if (req.body.data) {
    req.body = JSON.parse(req.body.data);
  }
  next();
});

export const userUtils = {
  bodyParse,
};
