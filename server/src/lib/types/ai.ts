import { z } from "zod";
export const PromptSchema = z.object({
  text: z.string(),
});
export type Prompt = z.infer<typeof PromptSchema>;

export const PromptResponseSchema = z.object({
  results: z.array(
    z.object({
      title: z.string(),
      description: z.string().optional(),
    })
  ),
});
export type PromptResponse = z.infer<typeof PromptResponseSchema>;
