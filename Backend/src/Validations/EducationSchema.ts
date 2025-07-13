import { z } from "zod";

const EduValidation = z.object({
  body: z.object({
    institute: z.string().nonempty(),
    fieldofstudy: z.string().nonempty(),
    degree: z.string().nonempty(),
    from: z.coerce.date(),
    to: z.coerce.date().optional(),
  }),
});

export default EduValidation;
