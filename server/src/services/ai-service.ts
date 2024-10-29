import OpenAI from "openai";
import { ChatCompletionCreateParamsNonStreaming } from "openai/resources/chat/completions";
import { PromptResponseSchema } from "../lib/types";
import { ZodError } from "zod";

const apiKey = process.env.OPENAI_API_KEY;

export const sendAIPrompt = async (prompt: string) => {
  const openai = new OpenAI();

  const promptFooter = `\n\nPlease provide results in json format as \`{ "results": [{ "title": "", "description": ""}]\``;

  const request: ChatCompletionCreateParamsNonStreaming = {
    messages: [{ role: "user", content: `${prompt}${promptFooter}` }],
    model: "gpt-4o-mini", // OR use "gpt-4o",
    temperature: 0,
    seed: 29112024, // number used to keep consistent results
    response_format: { type: "json_object" },
  };

  const result = await openai.chat.completions.create(request);

  return parseAIResponse(result.choices[0].message.content ?? "");
};

export const parseAIResponse = (response: string) => {
  let responseObject: any;

  try {
    responseObject = JSON.parse(response);
  } catch (err) {
    throw new Error(`The AI response is not a valid JSON string.  The response is: ${response}`);
  }

  try {
    return PromptResponseSchema.parse(responseObject);
  } catch (err) {
    if (err instanceof ZodError) {
      let zodError = err as ZodError;
      console.error(
        "AI Response did not conform to schema:",
        JSON.stringify(
          {
            aiResponse: responseObject,
            errors: zodError.errors.map((e) => ({
              path: e.path,
              message: e.message,
              error: e.code,
            })),
          },
          undefined,
          2
        )
      );
    } else {
      console.error({ responseObject, err });
    }

    throw err;
  }
};
