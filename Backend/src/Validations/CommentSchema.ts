import { z } from "zod";

const comntValidation = z.object({
  body: z.object({
    text: z.string().nonempty("Text is Required!"),
  }),
});

export default comntValidation;
