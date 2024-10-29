import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import { ErrorRequestHandler, RequestHandler } from "express";
export const withErrorHandler = (handler: RequestHandler): RequestHandler => {
  return async (request, response, next) => {
    try {
      return await handler(request, response, next);
    } catch (error) {
      next(error);
    }
  };
};

export const APIErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // Delegate to default express error handler if headers already sent
  if (res.headersSent) return next(err);

  console.error("Error", process.env.NODE_ENV === "development" ? err : err.message);
  if (
    err instanceof PrismaClientKnownRequestError ||
    err instanceof PrismaClientUnknownRequestError ||
    err instanceof PrismaClientValidationError
  ) {
    err.message = "Failed to perform the operation";
  }
  res.status(err.status || 500).send(err.message || "Unknown Error");
};