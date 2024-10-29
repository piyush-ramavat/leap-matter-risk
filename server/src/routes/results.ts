import { Handler } from "express";
import { APIErrorStatus, RestHelper } from "../lib/utils";
import { ApiError } from "../lib/utils/api-error";
import { SaveResultRequestSchema } from "../lib/types";
import { getAllResults, saveResult } from "../services";

// POST /api/results
export const saveResultHandler: Handler = async (req, res) => {
  const parsed = SaveResultRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    console.error("Zod Parse error", parsed.error);
    throw new ApiError(APIErrorStatus.BadRequest, "Bad Request");
  }
  const created = await saveResult(parsed.data);
  return RestHelper.json(res, created);
};

// GET /api/results
export const getResultHandler: Handler = async (req, res) => {
  RestHelper.json(res, await getAllResults());
};
