import { z } from "zod";

const createSpecialties = z.object({
  body: z.object({
    title: z.string(),
    icon: z.string(),
  }),
});

export const specialtiesValidation = {
  createSpecialties,
};
