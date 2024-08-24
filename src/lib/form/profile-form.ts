import { z } from "zod";

export const editProfileFormSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  username: z.string().min(1).max(100).optional(),
});
