import * as z from "zod";

export const questionSchema = z
  .object({
    question: z.string().min(5, {
      message: "Question should have minimum 5 characters",
    }),
    explanation: z.string().min(10, {
      message: "Ecplanation should have minimum 10 characters",
    }),
    isMultiChoice: z.boolean().optional().default(false),
    optionA: z.string().min(1, {
      message: "This Option is required",
    }),
    optionB: z.string().min(1, {
      message: "This Option is required",
    }),
    optionC: z.string().min(1, {
      message: "This Option is required",
    }),
    optionD: z.string().min(1, {
      message: "This Option is required",
    }),
    // answer: z.array(z.string()).min(1),
  })
