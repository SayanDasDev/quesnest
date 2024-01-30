import * as z from "zod";

export const MAX_OPTIONS = 10;

const optionSchema = z.object({
  option: z.string().min(1, {
    message: "This Option is required",
  })
});

export const questionSchema = z
  .object({
    question: z.string().min(5, {
      message: "Question should have minimum 5 characters",
    }),

    explanation: z.string().refine((value) => value.length === 0 || value.length >= 10, {
      message: "Explanation should have minimum 10 characters",
    }),

    isMultiChoice: z.boolean().optional().default(false),

    options: z.array(optionSchema).min(2).max(MAX_OPTIONS),
  });
