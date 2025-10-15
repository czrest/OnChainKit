import { z } from "zod";

// Zod schema for question validation
export const questionSchema = z
 .object({
  id: z.string(),
  text: z.string().min(1, "Question text is required"),
  type: z.enum([
   "short-answer",
   "long-answer",
   "multiple-choice",
   "checkbox",
   "rating",
   "date",
   "time",
  ]),
  options: z.array(z.string()).optional(),
  required: z.boolean(),
 })
 .superRefine((question, ctx) => {
  if (question.type === "multiple-choice" || question.type === "checkbox") {
   if (!question.options || question.options.length < 2) {
    ctx.addIssue({
     code: z.ZodIssueCode.custom,
     message:
      "Multiple choice and checkbox questions must have at least 2 options",
     path: ["options"],
    });
   }
   if (question.options) {
    const emptyOptions = question.options.filter((opt) => opt.trim() === "");
    if (emptyOptions.length > 0) {
     ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "All options must have text",
      path: ["options"],
     });
    }
   }
  }
 });

// Main form schema
export const surveySchema = z.object({
 title: z
  .string()
  .min(3, "Title must be at least 3 characters")
  .max(100, "Title must be less than 100 characters"),
 description: z
  .string()
  .min(10, "Description must be at least 10 characters")
  .max(500, "Description must be less than 500 characters"),
 numberOfRespondents: z.string().refine((val) => {
  const num = parseInt(val);
  return !isNaN(num) && num >= 1;
 }, "Number of respondents must be at lease 1"),
 reward: z.string().refine((val) => {
  const num = parseFloat(val);
  return !isNaN(num) && num > 0;
 }, "Reward must be a positive number"),
 screeningDescription: z
  .string()
  .min(10, "Screening description must be at least 10 characters"),
 screeningRequirements: z
  .string()
  .min(5, "Requirements must be at least 5 characters"),
 screeningDateTime: z.unknown(),
 meetingLink: z
  .string()
  .url("Must be a valid URL")
  .optional()
  .or(z.literal("")),
 location: z.string().optional(),
 screeningDeadline: z.unknown(),
 surveyFinalizeDate: z.unknown(),
 questions: z.array(questionSchema).min(1, "At least one question is required"),
});

