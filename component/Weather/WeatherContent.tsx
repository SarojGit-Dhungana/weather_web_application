"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { weatherAPI } from "@/fake-data/fake_weather_data";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
export default function WeatherContent() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const query = search.trim().toLowerCase();
  const filteredData = weatherAPI.filter(
    (item) =>
      item.city.toLowerCase().includes(query) ||
      item.country.toLowerCase().includes(query) ||
      item.condition.toLowerCase().includes(query),
  );
  const displayData = search ? filteredData : weatherAPI;
  const totalPages = Math.ceil(displayData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = displayData.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [displayData, totalPages, currentPage]);

  return (
    <div className="w-full h-screen flex flex-col items-start px-6 py-2 text-white">
      <h1 className="text-4xl font-bold mb-4">
        <ThunderstormIcon fontSize="large" />
        Weather
      </h1>
      <div className="relative w-full max-w-md mb-10">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-2 flex items-center shadow-lg">
          <input
            type="text"
            placeholder="Search city or country..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="flex-1 bg-transparent outline-none px-3 text-white placeholder-gray-300"
          />
        </div>
      </div>
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-6xl">
        {paginatedData.map((item, index) => (
          <Link
            href={`/weather/${item.id}`}
            key={index}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-5 shadow-xl
            hover:scale-105 transition"
          >
            <h2 className="text-xl font-semibold mb-2">
              {item.city}, {item.country}
            </h2>
            <p className="text-3xl font-bold mb-2">🌡 {item.temp}°C</p>
            <p>🌥 {item.condition}</p>
            <p className="text-sm text-gray-300">
              💧 Humidity: {item.humidity}%
            </p>
            <p className="text-sm text-gray-300">💨 Wind: {item.wind} km/h</p>
          </Link>
        ))}
      </div>
      {!search && (
        <div className="flex gap-2 mt-5 flex-wrap justify-center">
          <button
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
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
            className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
