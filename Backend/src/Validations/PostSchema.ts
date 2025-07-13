import { z } from "zod";

const PostValidation = z.object({
  body: z.object({
    text: z.string().nonempty("Text is Required!"),
  }),
});

export default PostValidation;
