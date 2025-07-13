import { z } from "zod";

const ProfileSchema = z.object({
  body: z.object({
    status: z.string().nonempty("Field is Required"),
    skills: z.array(z.string()),
  }),
});

export default ProfileSchema;
