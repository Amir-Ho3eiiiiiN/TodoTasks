import { z } from "zod";

export const todoSchema = z.object({
  title: z.string().min(1, "Title cannot be empty"),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters long"),
  priority: z
    .enum(["Low", "Medium", "High"])
    .refine((val) => !!val, { message: "Priority is required" }),
});

export type TodoInput = z.infer<typeof todoSchema>;
