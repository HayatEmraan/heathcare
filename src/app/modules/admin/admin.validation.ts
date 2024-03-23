import { z } from "zod";

const update = z.object({
  body: z
    .object({
      name: z.string(),
      contactNumber: z.string(),
      photoURL: z.string(),
    })
    .partial(),
});

export const adminValidation = {
  update,
};
