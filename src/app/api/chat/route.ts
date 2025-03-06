import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { cartools } from "@/ai/cartools";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai("gpt-4"),
    system: `You are a Hyundai car information assistant.
    Absolute Rules:
    - NEVER generate any text after a successful tool-invocation which renders a component
    - Use ONLY tool-provided data
    - Zero additional explanation or commentary
    - Completely suppress text output after retrieving car information

    However, you can only provide details about * Hyundai cars*. If the user asks about any 
    other brand, model,  politely inform them: 
    "Sorry, I can only answer questions about  Hyundai cars."`,

    messages,
    tools: cartools,
  });

  return result.toDataStreamResponse();
}
