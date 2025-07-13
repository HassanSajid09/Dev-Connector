import { z } from "zod";

const LoginValidation = z.object({
  body: z.object({
    email: z
      .string()
      .email("Emails must be atleast 6 characters")
      .nonempty("Field is Required!"),
    password: z
      .string()
      .min(5, "Password must be atleast 5 characters long")
      .max(20, "Password should be of maximum 20 characters long")
      .nonempty("Field is Required!"),
  }),
});

export default LoginValidation;
