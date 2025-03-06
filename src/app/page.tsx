"use client";

import { useChat } from "@ai-sdk/react";
import MessageComponent from "./components/message";

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, addToolResult } =
    useChat({
      maxSteps: 5,

      // run client-side tools that are automatically executed:
      async onToolCall({ toolCall }) {
        // if (toolCall.toolName === "getLocation") {
        //   const cities = [
        //     "New York",
        //     "Los Angeles",
        //     "Chicago",
        //     "San Francisco",
        //   ];
        //   return cities[Math.floor(Math.random() * cities.length)];
        // }
      },
    });
  console.log("messages--->>>", messages);
  return (
    <div className="flex flex-col h-screen max-w-6xl w-full mx-auto">
      <div className="flex-1 overflow-y-autoauto">
        {messages.map((message) => {
          return (
            <MessageComponent
              key={message.id}
              message={message}
              addToolResult={addToolResult}
            />
          );
        })}
      </div>

      <div className="w-full p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Type a message..."
            className="flex-1 border rounded-lg p-2 bg-transparent text-white outline-none"
          />
          <button
            type="submit"
            className="px-4 py-2 border rounded-lg hover:bg-white/10"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
