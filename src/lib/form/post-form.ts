import { z } from "zod";

export const CreatePostFormSchema = z.object({
  content: z
    .string({ required_error: "Post cannot be empty" })
    .min(1, "Post cannot be empty"),
});

export const EditPostFormSchema = z.object({
  content: z
    .string({ required_error: "Post cannot be empty" })
    .min(1, "Post cannot be empty"),
});
