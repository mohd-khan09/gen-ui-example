import { CarProps } from "@/app/components/CarCard";
import { carDatabase } from "@/app/utils/HundaicarsData";
import { tool } from "ai";
import { z } from "zod";

export const getCarInformation = tool({
  description: "show the details of the car in a given city to the user",
  parameters: z.object({
    location: z
      .string()
      .min(2)
      .describe("City or State to get the car information for"),
    carName: z.string().describe("Name of the car to get information for"),
  }),
  execute: async ({
    location,
    carName,
  }: {
    location: string;
    carName: string;
  }): Promise<CarProps | null> => {
    const car =
      carDatabase.find((c) =>
        c.name.toLowerCase().includes(carName.toLowerCase())
      ) || carDatabase[0];
    return {
      ...car,
      location,
    };
  },
});

export const getLocation = tool({
  description:
    "Get the user location. Always ask for confirmation before using this tool.",
  parameters: z.object({}),
});

export const askForConfirmation = tool({
  description: "Ask the user for confirmation.",
  parameters: z.object({
    message: z.string().describe("The message to ask for confirmation."),
  }),
});

export const cartools = { getCarInformation, askForConfirmation, getLocation };
