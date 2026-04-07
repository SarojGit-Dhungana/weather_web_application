"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";

export default function WeatherContent() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const itemsPerPage = 8;

  // 🔥 Fetch weather data
  const fetchWeather = async (query = "Kathmandu") => {
    setLoading(true);

    try {
      const res = await fetch(`/api/search?q=${query}`);
      const cities = await res.json();

      const weatherResults = await Promise.all(
        cities.map(async (city, index) => {
          const weatherRes = await fetch(`/api/weather?city=${city.name}`);
          const weather = await weatherRes.json();

          return {
            id: index,
            city: weather.city,
            country: weather.country,
            temp: weather.temp,
            condition: weather.condition,
            humidity: weather.humidity,
            wind: weather.wind,
          };
        }),
      );

      setData(weatherResults);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (search) {
        fetchWeather(search);
        setCurrentPage(1);
      }
    }, 500);
    return () => clearTimeout(delay);
  }, [search]);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="w-full h-screen flex flex-col items-start px-6 py-2 text-white">
      <h1 className="text-4xl font-bold mb-4 flex items-center gap-2">
        <ThunderstormIcon fontSize="large" />
        Weather
      </h1>
      <div className="w-full max-w-md mb-10">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-2">
          <input
            type="text"
            placeholder="Search city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent outline-none px-3 text-white"
          />
        </div>
      </div>
      {loading && <p>Loading...</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-6xl">
        {paginatedData.map((item) => (
          <Link
            href={`/weather/${item.city}`}
            key={item.id}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-5 shadow-xl hover:scale-105 transition"
          >
            <h2 className="text-xl font-semibold mb-2">
              {item.city}, {item.country}
            </h2>

            <p className="text-3xl font-bold mb-2">🌡 {item.temp}°C</p>

            <p>🌥 {item.condition}</p>

            <p className="text-sm text-gray-300">
              💧 Humidity: {item.humidity ?? "N/A"}%
            </p>

            <p className="text-sm text-gray-300">
              💨 Wind: {item.wind ?? "N/A"} km/h
            </p>
          </Link>
        ))}
      </div>

      {/* PAGINATION */}
      {!search && (
        <div className="flex gap-2 mt-5 flex-wrap justify-center">
          <button
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-700 rounded"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded ${
                currentPage === i + 1 ? "bg-purple-600" : "bg-gray-700"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-700 rounded"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
