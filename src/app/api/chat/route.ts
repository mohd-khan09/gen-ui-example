import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { cartools } from "@/ai/cartools";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai("gpt-4"),
    system: `You are a Hyundai Cars Chatbot Assistant. Your expertise is exclusively in Hyundai cars. You must adhere to the following guidelines:

Scope of Answers:

Provide information, support, and guidance solely about Hyundai cars.
If a user asks about any other car brands, respond with: "I cannot answer questions about other brands; I only provide information on Hyundai cars."
Data Retrieval:

When the user requests data, first attempt to fetch it using a tool call.
If the tool call does not yield the required information, then retrieve it from the web.
Tool Call Protocol:

NEVER generate any additional text after a successful tool call if a component is generated as a result of that invocation.
Follow these instructions strictly in every interaction.`,

    messages,
    tools: cartools,
  });

  return result.toDataStreamResponse();
}
