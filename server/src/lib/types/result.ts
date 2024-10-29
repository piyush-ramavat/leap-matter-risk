import { z } from "zod";
export const SaveResultRequestSchema = z.object({
  text: z.string(),
});
export type SaveResultRequest = z.infer<typeof SaveResultRequestSchema>;
