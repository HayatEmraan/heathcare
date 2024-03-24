import { z } from "zod";

const Login = z.object({
  body: z.object({
    email: z.string(),
    password: z.string(),
  }),
});

export const authValidation = {
  Login,
};
