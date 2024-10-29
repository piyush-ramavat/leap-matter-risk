import { Handler } from "express";
import { APIErrorStatus, RestHelper } from "../lib/utils";
import { ApiError } from "../lib/utils/api-error";
import { SaveResultRequestSchema } from "../lib/types";
import { findAllResults, findResult, saveResult, updateResult } from "../services";

// POST /api/results
export const saveResultHandler: Handler = async (req, res) => {
  const parsed = SaveResultRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    console.error("Zod Parse error", parsed.error);
    throw new ApiError(APIErrorStatus.BadRequest, "Bad Request", parsed.error);
  }
  const created = await saveResult(parsed.data);
  return RestHelper.json(res, created);
};

// GET /api/results/list
export const getResultListHandler: Handler = async (req, res) => {
  return RestHelper.json(res, await findAllResults());
};

// GET /api/results/:resultId
export const getResultHandler: Handler = async (req, res) => {
  const resultId = Number(req.params.resultId);

  if (isNaN(resultId)) {
    throw new ApiError(APIErrorStatus.BadRequest, "Bad request");
  }
  const result = await findResult(resultId);

  if (!result) {
    throw new ApiError(APIErrorStatus.NotFound, "result not found");
  }
  return RestHelper.json(res, result);
};

// PUT /api/results/:resultId
export const updateResultHandler: Handler = async (req, res) => {
  const resultId = Number(req.params.resultId);
  const result = await findResult(resultId);

  if (!result) {
    throw new ApiError(APIErrorStatus.NotFound, "result not found");
  }

  const parsed = SaveResultRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new ApiError(APIErrorStatus.BadRequest, "Bad Request", parsed.error);
  }
  const updated = await updateResult(resultId, parsed.data);
  return RestHelper.json(res, updated);
};
