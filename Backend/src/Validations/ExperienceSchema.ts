import { z } from "zod";

const ExpValidation = z.object({
  body: z.object({
    title: z.string().nonempty("Title is Required!"),
    company: z.string().nonempty("Company is Required!"),
    from: z.coerce.date(),
    to: z.coerce.date().optional(),
  }),
});

export default ExpValidation;
