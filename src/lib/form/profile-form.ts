import { z } from "zod";

export const editUsernameFormSchema = z.object({
  username: z.string().min(1).max(255).optional(),
});
