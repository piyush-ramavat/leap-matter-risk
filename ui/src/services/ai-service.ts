import { useMutation } from "react-query";
import { MutationResponse, useApiDataClient } from "../lib/utils";
import { Prompt, PromptResponse } from "../lib/types";

export const useQueryAI = (): MutationResponse<Prompt, PromptResponse> => {
  const apiClient = useApiDataClient();
  // const url = `${process.env.API_BASE_URL}//api/query-ai`;// TODO: check why process.env is not working
  const url = `http://localhost:3001/api/query-ai`;

  return useMutation((requestData: Prompt) =>
    apiClient.post<PromptResponse>(url, requestData)
  );
};
