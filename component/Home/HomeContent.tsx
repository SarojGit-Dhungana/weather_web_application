"use client";
import React, { useState } from "react";
import { weatherAPI } from "@/fake-data/fake_weather_data";
import Link from "next/link";
import { LocationSearching } from "@mui/icons-material";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
export default function HomeContent() {
  const [search, setSearch] = useState("");
  const FilteredData = weatherAPI
    .filter((item) => {
      const query = search.trim().toLowerCase();
      return (
        item.city.toLowerCase().includes(query) ||
        item.country.toLowerCase().includes(query) ||
        item.condition.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => a.city.localeCompare(b.city));
  const cards = [
    {
      title: "Real-time Weather",
      desc: "Accurate current weather conditions anytime.",
    },
    {
      title: "City Forecast",
      desc: "Explore weather forecasts for multiple cities.",
    },
    {
      title: "Interactive Map",
      desc: "Visualize weather patterns on the map.",
    },
  ];
  return (
    <div className="flex flex-col items-center h-full text-center px-6 w-full">
      <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-lienar-to-r from-purple-400 to-pink-500 bg-clip-text text-gray-100">
        Weather App
      </h1>
      <p className="text-gray-300 max-w-xl mb-10">
        Get real-time weather updates, forecasts, and map insights for any city
        around the world.
      </p>

      <div className="w-3xl rounded-t-2xl bg-white/10 backdrop-blur-lg p-2 flex items-center shadow-lg">
        <input
          type="text"
          placeholder="Search city or country..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-transparent outline-none px-3 text-white placeholder-gray-300"
        />
        <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition hover:scale-105">
          Search
        </button>
      </div>

      {search && (
        <div className=" w-3xl rounded-b-2xl bg-white/10 backdrop-blur-lg text-white shadow-lg max-h-60 overflow-y-auto z-50">
          {FilteredData.length > 0 ? (
            FilteredData.map((item, index) => (
              <Link
                href={`/weather/${item.id}`}
                key={index}
                className="px-4 py-2 flex gap-5 justify-center  p-5 hover:bg-gray-100 hover:text-gray-600 cursor-pointer transition"
                onClick={() => setSearch(item.city)}
              >
                <div className="font-medium">
                  {item.city}, {item.country}
                </div>
                <div className="text-sm text-gray-400 ">
                  <DeviceThermostatIcon
                    fontSize="small"
                    className="text-red-300"
                  />{" "}
                  {item.temp}°C
                </div>
              </Link>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-500">No results found</div>
          )}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 w-full max-w-4xl">
        {cards.map((cardItem) => (
          <div
            key={cardItem.title}
            className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl hover:scale-105 transition"
          >
            <h3 className="text-xl font-semibold mb-2">{cardItem.title}</h3>
            <p className="text-gray-300 text-sm">{cardItem.desc}</p>
          </div>
        ))}
      </div>
      <Link
        href={"/weather"}
        className="mt-12 px-6 py-3 bg-linear-to-r from-purple-600 to-pink-500 rounded-xl font-semibold shadow-lg hover:scale-105 transition"
      >
        Weather Forcasting
      </Link>
    </div>
  );
}
