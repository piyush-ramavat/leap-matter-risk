import { Router } from "express";
import { healthCheckHandler } from "./health-check";
import { RestHelper, withErrorHandler } from "../lib/utils";
import { queryAIHandler } from "./ai";

const apiRouter = Router();

// Public routes
apiRouter.get("/health-check", healthCheckHandler);

apiRouter.post("/api/query-ai", withErrorHandler(queryAIHandler));

// Unknown
apiRouter.use((req, res) => {
  return RestHelper.notFound(res);
});

export default apiRouter;
