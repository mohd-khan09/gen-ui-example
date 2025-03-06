"use client";

import type { Message } from "ai";
import Car from "./CarCard";

export default function MessageComponent({
  message,
  addToolResult,
}: {
  message: Message;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  addToolResult: (toolResult: any) => void;
}) {
  console.log("message--->>>", message);
  return (
    <div
      className={`flex flex-col gap-5 p-4 ${
        message.role === "assistant" ? "bg-gray-900 rounded-lg" : ""
      }`}
    >
      <div className="text-sm text-gray-500 font-medium">
        {message.role === "user" ? "User" : "Assistant"}
      </div>
      {message.parts?.map((part) => {
        switch (part.type) {
          // render text parts as simple text:
          case "text":
            return part.text;

          // for tool invocations, distinguish between the tools and the state:
          case "tool-invocation": {
            const callId = part.toolInvocation.toolCallId;

            switch (part.toolInvocation.toolName) {
              case "askForConfirmation": {
                switch (part.toolInvocation.state) {
                  case "call":
                    return (
                      <div key={callId}>
                        {part.toolInvocation.args.message}
                        <div>
                          <button
                            onClick={() =>
                              addToolResult({
                                toolCallId: callId,
                                result: "Yes, confirmed.",
                              })
                            }
                          >
                            Yes
                          </button>
                          <button
                            onClick={() =>
                              addToolResult({
                                toolCallId: callId,
                                result: "No, denied",
                              })
                            }
                          >
                            No
                          </button>
                        </div>
                      </div>
                    );
                  case "result":
                    return (
                      <div key={callId}>
                        Location access allowed: {part.toolInvocation.result}
                      </div>
                    );
                }
                break;
              }

              case "getLocation": {
                switch (part.toolInvocation.state) {
                  case "call":
                    return <div key={callId}>Getting location...</div>;
                  case "result":
                    return (
                      <div key={callId}>
                        Location: {part.toolInvocation.result}
                      </div>
                    );
                }
                break;
              }

              case "getCarInformation": {
                switch (part.toolInvocation.state) {
                  // example of pre-rendering streaming tool calls:
                  case "partial-call":
                    return (
                      <pre key={callId}>
                        {JSON.stringify(part.toolInvocation, null, 2)}
                      </pre>
                    );
                  case "call":
                    return (
                      <div key={callId}>
                        Getting car information for{" "}
                        {part.toolInvocation.args.city}...
                      </div>
                    );
                  case "result":
                    return (
                      <Car
                        {...part.toolInvocation.result}
                        toolCallId={callId}
                        key={callId}
                      />
                    );
                }
                break;
              }
            }
          }
        }
      })}
      <br />
      {/* {message.parts?.map((part, index) => {
        switch (part.type) {
          case "text":
            return (
              <div key={index} className="text-sm whitespace-pre-wrap">
                {part.text}
              </div>
            );
          case "tool-invocation": {
            const toolCallId = part.toolInvocation.toolCallId;

            switch (part.toolInvocation.toolName) {
              case "getWeather": {
                if (part.toolInvocation.state === "partial-call") {
                  return (
                    <div
                      key={toolCallId}
                      className="animate-pulse flex space-x-4"
                    >
                      <div className="rounded-lg bg-slate-700 h-32 w-full"></div>
                    </div>
                  );
                }
                if (part.toolInvocation.state === "result") {
                  return (
                    <Weather
                      {...part.toolInvocation.result}
                      toolCallId={toolCallId}
                      key={toolCallId}
                    />
                  );
                }
                return (
                  <div key={toolCallId} className="text-red-500">
                    Failed to load weather data
                  </div>
                );
              }
              default:
                return (
                  <div key={toolCallId} className="text-yellow-500">
                    Unsupported tool
                  </div>
                );
            }
          }
          default:
            return null;
        }
      })} */}
    </div>
  );
}
