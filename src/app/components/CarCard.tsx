"use client";

import Image from "next/image";

export interface CarProps {
  name: string;
  image: string;
  releaseYear: number;
  model: string;
  fuelType: "petrol" | "diesel" | "electric" | "hybrid" | string;
  horsepower?: number;
  mileage?: number;
  transmission?: string;
  toolCallId?: string;
  location: string;
  onRoadPrice: number | string;
}

const getFuelBadge = (fuel: string) => {
  switch (fuel) {
    case "petrol":
      return "⛽";
    case "diesel":
      return "🛢️";
    case "electric":
      return "⚡";
    case "hybrid":
      return "🔌";
    default:
      return "🚗";
  }
};

const getCarBackground = (fuel: string) => {
  switch (fuel) {
    case "petrol":
      return "bg-red-100 text-red-900";
    case "diesel":
      return "bg-yellow-100 text-yellow-900";
    case "electric":
      return "bg-green-100 text-green-900";
    case "hybrid":
      return "bg-blue-100 text-blue-900";
    default:
      return "bg-gray-100 text-gray-900";
  }
};

export default function Car({
  name,
  image,
  releaseYear,
  model,
  fuelType,
  horsepower,
  mileage,
  transmission,
  toolCallId,
  onRoadPrice,
  location,
}: CarProps) {
  return (
    <div
      key={toolCallId}
      className={`p-6  mx-auto rounded-xl shadow-md flex items-center space-x-4 ${getCarBackground(
        fuelType
      )}`}
    >
      <Image
        className="h-64 w-[500px] rounded-md object-cover border border-gray-700 shadow-lg"
        src={image}
        alt={`${name} image`}
        height={30}
        width={40}
      />

      <div className="flex flex-col gap-2">
        <div className="text-2xl font-bold pb-6">{name}</div>
        <p className="text-sm">
          <span className="font-bold">Model:</span> {model} ({releaseYear})
        </p>
        <p className="text-sm flex items-center">
          <span className="font-bold">Fuel Type:</span>{" "}
          {fuelType.charAt(0).toUpperCase() + fuelType.slice(1)}
          {"   "}
          <span className="mr-2">{getFuelBadge(fuelType)}</span>
        </p>
        {horsepower && (
          <p className="text-sm">
            <span className="font-bold">Horsepower:</span> {horsepower} HP
          </p>
        )}
        {mileage && (
          <p className="text-sm">
            <span className="font-bold">Mileage:</span> {mileage} km
          </p>
        )}
        {transmission && (
          <p className="text-sm">
            <span className="font-bold">Transmission:</span> {transmission}
          </p>
        )}
        <p className="text-sm">
          <span className="font-bold">Location:</span> {location}
        </p>
        <p className="text-sm">
          <span className="font-bold">On Road Price:</span> ₹
          {onRoadPrice.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
