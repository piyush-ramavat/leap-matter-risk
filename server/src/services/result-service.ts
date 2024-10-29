import { SaveResultRequest, SaveResultRequestSchema } from "../lib/types";
import { dbService } from "../lib/db-service";

export const saveResult = (resultData: SaveResultRequest) => {
  const parsed = SaveResultRequestSchema.safeParse(resultData);
  if (!parsed.success) {
    throw parsed.error;
  }
  const db = dbService();
  return db.result.create({
    data: {
      ...resultData,
    },
  });
};

export const getAllResults = () => {
  const db = dbService();
  return db.result.findMany();
};
