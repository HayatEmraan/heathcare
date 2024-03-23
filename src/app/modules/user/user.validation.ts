import { z } from "zod";

const create = z.object({
  body: z.object({
    password: z.string(),
    role: z.string().optional(),
    email: z.string(),
    admin: z.object({
      name: z.string(),
      contactNumber: z.string(),
    }),
  }),
});

export const userValidation = {
  create,
};
