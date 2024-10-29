import { Handler } from "express";
import { PromptSchema } from "../lib/types";
import { ApiError, APIErrorStatus, RestHelper } from "../lib/utils";
import { sendAIPrompt } from "../services";

// POST /api/query-ai
export const queryAIHandler: Handler = async (req, res) => {
  const parsed = PromptSchema.safeParse(req.body);
  if (!parsed.success) {
    console.error("Zod Parse error", parsed.error);
    throw new ApiError(APIErrorStatus.BadRequest, "Bad Request", parsed.error);
  }
  const result = await sendAIPrompt(parsed.data.text);
  return RestHelper.json(res, result);
};
