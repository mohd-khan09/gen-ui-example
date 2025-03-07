// import { tool } from "ai";
// import { z } from "zod";

// export const getWeatherInformation = tool({
//   description: "show the weather in a given city to the user",
//   parameters: z.object({
//     location: z
//       .string()
//       .min(2)
//       .describe("City, State or Country to get the weather for"),
//   }),

//   execute: async ({ location }: { location: string }) => {
//     const weatherTypes = [
//       "sunny",
//       "rainy",
//       "cloudy",
//       "snowy",
//       "partly_cloudy",
//       "thunderstorm",
//     ];
//     const randomTemp = Math.floor(Math.random() * (35 - -5)) + -5;
//     const randomWeather =
//       weatherTypes[Math.floor(Math.random() * weatherTypes.length)];

//     return {
//       location,
//       temperature: randomTemp,
//       weather: randomWeather,
//     };
//   },
// });

// export const askForConfirmation = tool({
//   description: "Ask the user for confirmation.",
//   parameters: z.object({
//     message: z.string().describe("The message to ask for confirmation."),
//   }),
// });

// export const getLocation = tool({
//   description:
//     "Get the user location. Always ask for confirmation before using this tool.",
//   parameters: z.object({}),
// });

// export const tools = { getWeatherInformation, askForConfirmation, getLocation };
