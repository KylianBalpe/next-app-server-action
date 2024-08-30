import { z } from "zod";

export const EditUsernameFormSchema = z.object({
  username: z
    .string({ required_error: "Username cannot be empty" })
    .min(1, "Username cannot be empty")
    .max(100, "Username cannot be longer than 100 characters")
    .optional(),
});
