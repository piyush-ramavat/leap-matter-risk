import { SaveResultRequest, SaveResultRequestSchema } from "../lib/types";
import { dbService } from "../lib/db-service";
import { Result } from "@prisma/client";

export const saveResult = async (resultData: SaveResultRequest): Promise<Result> => {
  const parsed = SaveResultRequestSchema.safeParse(resultData);
  if (!parsed.success) {
    throw parsed.error;
  }
  const db = dbService();

  return await db.result.create({
    data: {
      ...resultData,
    },
  });
};

export const findAllResults = async (): Promise<Result[]> => {
  const db = dbService();

  return await db.result.findMany();
};

export const findResult = async (resultId: number): Promise<Result | null> => {
  const db = dbService();

  return await db.result.findFirst({
    where: {
      id: resultId,
    },
  });
};

export const updateResult = async (resultId: number, resultData: SaveResultRequest): Promise<Result> => {
  const db = dbService();

  const parsed = SaveResultRequestSchema.safeParse(resultData);
  if (!parsed.success) {
    throw parsed.error;
  }

  const updated = await db.result.update({
    data: { ...resultData },
    where: { id: resultId },
  });

  return updated;
};

export const deleteAll = async () => {
  const db = dbService();

  return await db.result.deleteMany();
};
