"use client";
import React, { useState } from "react";
import Link from "next/link";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import RefreshIcon from "@mui/icons-material/Refresh";
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
    <div className="flex flex-col items-center min-h-screen text-center px-4 sm:px-6 w-full">
      <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 text-gray-100">
        Weather App
      </h1>
      <p className="text-gray-300 max-w-xl mb-8 sm:mb-10 text-sm sm:text-base">
        Get real-time weather updates, forecasts, and insights.
      </p>
      <div className="w-full max-w-3xl rounded-2xl sm:rounded-t-2xl bg-white/10 backdrop-blur-lg p-2 flex flex-col sm:flex-row items-center shadow-lg gap-2">
        <input
          type="text"
          placeholder="Search city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent outline-none px-3 py-2 text-white"
        />
        <button
          onClick={fetchWeather}
          className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg"
        >
          Search
        </button>
      </div>
      {(results.length > 0 || loading) && (
        <div className="w-full max-w-3xl rounded-b-2xl bg-white/10 text-white max-h-60 overflow-y-auto mt-1">
          {loading ? (
            <div className="p-4 text-gray-300">
              <p className="mt-6 text-4xl font-bold text-white-400 ">
                <RefreshIcon
                  fontSize="large"
                  className="animate-spin text-4xl mr-2"
                />
                Loading.....
              </p>
            </div>
          ) : (
            results.map((item) => (
              <Link
                href={`/weather`}
                key={item.id}
                className="flex justify-between items-center px-4 py-3 hover:bg-gray-200 hover:text-black text-sm sm:text-base"
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-10 sm:mt-12 w-full max-w-4xl">
        {cards.map((cardItem) => (
          <div
            key={cardItem.title}
            className="bg-white/10 backdrop-blur-lg p-5 sm:p-6 rounded-2xl shadow-xl hover:scale-105 transition"
          >
            <h3 className="text-lg sm:text-xl font-semibold mb-2">
              {cardItem.title}
            </h3>
            <p className="text-gray-300 text-sm">{cardItem.desc}</p>
          </div>
        ))}
      </div>
      <Link
        href={"/weather"}
        className="mt-10 sm:mt-12 px-6 py-3 bg-purple-600 rounded-xl text-sm sm:text-base"
      >
        Weather Forecasting
      </Link>
    </div>
  );
}
