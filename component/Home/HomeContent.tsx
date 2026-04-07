"use client";
import React, { useState } from "react";
import Link from "next/link";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";

export default function HomeContent() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchWeather = async () => {
    if (!search) return;
    setLoading(true);
    try {
      const res = await fetch(
        `http://api.weatherapi.com/v1/search.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${search}`,
      );
      const cities = await res.json();
      const topCities = cities.slice(0, 10);
      const weatherResults = await Promise.all(
        topCities.map(async (city, index) => {
          const weatherRes = await fetch(
            `http://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${city.name}`,
          );
          const weatherData = await weatherRes.json();
          return {
            id: index,
            city: city.name,
            country: city.country,
            temp: weatherData.current?.temp_c || "N/A",
            condition: weatherData.current?.condition?.text || "",
          };
        }),
      );
      setResults(weatherResults);
    } catch (err) {
      console.error(err);
      alert("Error fetching weather");
    }
    setLoading(false);
  };
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
      <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-100">
        Weather App
      </h1>

      <p className="text-gray-300 max-w-xl mb-10">
        Get real-time weather updates, forecasts, and insights.
      </p>
      <div className="w-3xl rounded-t-2xl bg-white/10 backdrop-blur-lg p-2 flex items-center shadow-lg">
        <input
          type="text"
          placeholder="Search city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-transparent outline-none px-3 text-white"
        />
        <button
          onClick={fetchWeather}
          className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg"
        >
          Search
        </button>
      </div>
      {(results.length > 0 || loading) && (
        <div className="w-3xl rounded-b-2xl bg-white/10 text-white max-h-60 overflow-y-auto">
          {loading ? (
            <div className="p-4 text-gray-300">Loading...</div>
          ) : (
            results.map((item) => (
              <Link
                href={`/weather`}
                key={item.id}
                className="flex justify-between px-4 py-3 hover:bg-gray-200 hover:text-black"
              >
                <div>
                  {item.city}, {item.country}
                </div>
                <div className="flex items-center gap-2">
                  <DeviceThermostatIcon fontSize="small" />
                  {item.temp}°C
                </div>
              </Link>
            ))
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
        className="mt-12 px-6 py-3 bg-purple-600 rounded-xl"
      >
        Weather Forecasting
      </Link>
    </div>
  );
}
