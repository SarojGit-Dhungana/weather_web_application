"use client";
import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import ShowerIcon from "@mui/icons-material/Shower";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function WeatherContent() {
  const [search, setSearch] = useState("");
  const [weatherAPI, setWeatherAPI] = useState([]);

  const fetchWeather = async (query = "Kathmandu") => {
    try {
      const res = await fetch(
        `http://api.weatherapi.com/v1/search.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${query}`,
      );
      const cities = await res.json();
      const topCities = cities.slice(0, 12);

      const weatherResults = await Promise.all(
        topCities.map(async (city, index) => {
          const weatherRes = await fetch(
            `http://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${city.name}`,
          );
          const data = await weatherRes.json();

          return {
            id: index,
            city: data.location.name,
            country: data.location.country,
            temp: data.current.temp_c,
            condition: data.current.condition.text,
            humidity: data.current.humidity,
            wind: data.current.wind_kph,
          };
        }),
      );

      setWeatherAPI(weatherResults);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (search) {
        fetchWeather(search);
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [search]);

  const displayData = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return weatherAPI;

    return weatherAPI.filter(
      (item) =>
        item.city.toLowerCase().includes(query) ||
        item.country.toLowerCase().includes(query) ||
        item.condition.toLowerCase().includes(query),
    );
  }, [search, weatherAPI]);

  return (
    <div className="w-full min-h-screen flex flex-col items-start px-4 sm:px-6 md:px-8 py-4 text-white">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 flex items-center gap-2">
        <ThunderstormIcon /> Weather Page
      </h1>

      <div className="relative w-full max-w-md mb-8 sm:mb-10">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-2 flex items-center shadow-lg">
          <input
            type="text"
            placeholder="Search city or country..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent outline-none px-3 py-2 text-white placeholder-gray-300 text-sm sm:text-base"
          />
        </div>
      </div>

      <div className="w-full flex flex-col gap-4 sm:gap-6 max-w-6xl">
        {displayData.map((item, index) => (
          <Link
            href={`/weather`}
            key={index}
            className="bg-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl border border-white/20 hover:scale-[1.02] transition"
          >
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold">
                  {item.city}, {item.country}
                </h2>
                <p className="text-gray-300 text-sm sm:text-base">
                  {item.condition}
                </p>
              </div>
              <div className="text-2xl sm:text-3xl md:text-4xl">🌥</div>
            </div>

            <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-6">
              🌡 {item.temp}°C
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-white/5 p-3 rounded-xl">
                <p className="text-gray-200 text-sm py-1 px-1 flex items-center gap-1">
                  <ShowerIcon fontSize="small" />
                  Humidity
                </p>
                <p className="text-sm sm:text-base">{item.humidity}%</p>
              </div>
              <div className="bg-white/5 p-3 rounded-xl">
                <p className="text-gray-200 text-sm py-1 px-1">💨 Wind</p>
                <p className="text-sm sm:text-base">{item.wind} km/h</p>
              </div>
              <div className="bg-white/5 p-3 rounded-xl">
                <p className="text-gray-200 text-sm py-1 px-1 flex items-center gap-1">
                  <AcUnitIcon fontSize="small" />
                  Condition
                </p>
                <p className="text-sm sm:text-base">{item.condition}</p>
              </div>

              <div className="bg-white/5 p-3 rounded-xl">
                <p className="text-gray-200 text-sm py-1 px-1 flex items-center gap-1">
                  <DeviceThermostatIcon fontSize="small" />
                  Temp
                </p>
                <p className="text-sm sm:text-base">{item.temp}°C</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {displayData.length === 0 && (
        <p className="mt-6 text-xl sm:text-2xl md:text-4xl font-bold text-white">
          <RefreshIcon
            fontSize="large"
            className="animate-spin text-2xl sm:text-3xl md:text-4xl mr-2"
          />
          Loading.....
        </p>
      )}
    </div>
  );
}
