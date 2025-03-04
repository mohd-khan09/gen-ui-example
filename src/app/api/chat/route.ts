import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { cartools } from "@/ai/cartools";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai("gpt-4o-mini"),
    system: `You are a knowledgeable car assistant that helps users with car-related queries. 
    You can provide detailed information about different Hyundai car models, including specifications, 
    fuel types, on-road prices, and availability. 

    However, you can only provide details about * Hyundai cars*. If the user asks about any 
    other brand, model,  politely inform them: 
    "Sorry, I can only answer questions about  Hyundai cars."`,

    messages,
    tools: cartools,
  });

  return result.toDataStreamResponse();
}
