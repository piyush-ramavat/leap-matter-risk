import { Router } from "express";
import { healthCheckHandler } from "./health-check";
import { RestHelper, withErrorHandler } from "../lib/utils";
import { getResultHandler, saveResultHandler } from "./results";

const apiRouter = Router();

// Public routes
apiRouter.get("/health-check", healthCheckHandler);

// API routes
apiRouter.post("/api/results", withErrorHandler(saveResultHandler));
apiRouter.get("/api/results", withErrorHandler(getResultHandler));

// Unknown
apiRouter.use((req, res) => {
  return RestHelper.notFound(res);
});

export default apiRouter;
