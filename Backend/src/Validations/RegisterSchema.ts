import { z } from "zod";

const RegisterValidation = z.object({
  body: z.object({
    name: z
      .string()
      .min(4, "Name must be atleast 4 characters long!")
      .max(15, "Name should be of maximum 15 characters")
      .nonempty("Field is Required!"),
    email: z
      .string()
      .email("Emails must be atleast 6 characters")
      .nonempty("Field is Required!"),
    password: z
      .string()
      .min(5, "Password must be atleast 5 characters long")
      .max(20, "Password should be of maximum 20 characters long")
      .nonempty("Field is Required!")
  }),
});

export default RegisterValidation;
