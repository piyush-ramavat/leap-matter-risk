import { Router } from "express";
import { healthCheckHandler } from "./health-check";
import { RestHelper, withErrorHandler } from "../lib/utils";
import { getResultHandler, getResultListHandler, saveResultHandler, updateResultHandler } from "./results";

const apiRouter = Router();

// Public routes
apiRouter.get("/health-check", healthCheckHandler);

// API routes
apiRouter.post("/api/results", withErrorHandler(saveResultHandler));
apiRouter.get("/api/results/list", withErrorHandler(getResultListHandler));
apiRouter.get("/api/results/:resultId", withErrorHandler(getResultHandler));
apiRouter.put("/api/results/:resultId", withErrorHandler(updateResultHandler));

// Unknown
apiRouter.use((req, res) => {
  return RestHelper.notFound(res);
});

export default apiRouter;
