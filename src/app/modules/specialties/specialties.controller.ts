import httpStatus from "http-status";
import { globalResponse } from "../../libs/globalResponseHandler";
import { catchAsync } from "../../errors/catchAsync";
import { specialtiesService } from "./specialties.service";

const createSpecialties = catchAsync(async (req, res) => {
  globalResponse(res, {
    status: httpStatus.CREATED,
    success: true,
    message: "Specialties created successful",
    data: await specialtiesService.insertIntoDBSpecialties(req.body, req.file),
  });
});

const getSpecialties = catchAsync(async (req, res) => {
  globalResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Specialties retrieve successful",
    data: await specialtiesService.retrieveSpecialtiesFromDB(),
  });
});

const deleteSpecialties = catchAsync(async (req, res) => {
  globalResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Specialties delete successful",
    data: await specialtiesService.deleteSpecialtiesFromDB(
      req.params.specialID
    ),
  });
});

export const specialtiesController = {
  createSpecialties,
  getSpecialties,
  deleteSpecialties,
};
