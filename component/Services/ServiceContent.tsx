"use client";

import React, { useState, useEffect } from "react";
import { servicesAPI } from "@/fake-data/fake-service";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import StarIcon from "@mui/icons-material/Star";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

export default function ServiceContent() {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  useEffect(() => {
    const sorted = [...servicesAPI].sort((a, b) => b.rating - a.rating);
    setServices(sorted);
  }, []);
  const categories = [...new Set(servicesAPI.map((s) => s.category))];
  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
    setCurrentPage(1);
  };
  const handleAllServices = () => {
    setSelectedCategories([]);
    setSearch("");
    setCurrentPage(1);
  };
  const filteredServices = services.filter((service) => {
    const matchSearch =
      service.name.toLowerCase().includes(search.toLowerCase()) ||
      service.category.toLowerCase().includes(search.toLowerCase());

    const matchCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(service.category);
    return matchSearch && matchCategory;
  });
  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
  const paginatedServices = filteredServices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="flex gap-6 p-6 text-white">
      <div className="w-72 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 h-fit sticky top-6">
        <h2 className="text-lg font-semibold mb-6 text-white">Filters</h2>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by name and catageory"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/10 focus:border-white/30 outline-none text-sm placeholder-gray-400"
          />
        </div>
        <div className="mb-6">
          <button
            onClick={handleAllServices}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition ${
              selectedCategories.length === 0 && search === ""
                ? "bg-white text-black font-medium"
                : "hover:bg-white/10 text-gray-300"
            }`}
          >
            All Services
          </button>
        </div>
        <div className="border-t border-white/10 mb-6"></div>
        <div className="mb-6">
          <p className="text-xs uppercase text-gray-400 mb-3 tracking-wide">
            Categories
          </p>
          <div className="space-x-2 space-y-2">
            {categories.map((category) => {
              const active = selectedCategories.includes(category);
              return (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-3 py-1.5 rounded-full text-sm border transition ${
                    active
                      ? "bg-white text-black border-white"
                      : "border-white/20 text-gray-300 hover:bg-white/10"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
        <div className="border-t border-white/10 mb-6"></div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setSelectedCategories([]);
              setSearch("");
            }}
            className="flex-1 py-2 rounded-lg border border-white/20 text-sm hover:bg-white/10 transition"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-6">🧠 Services</h1>
        <div className="grid md:grid-cols-3 gap-6">
          {paginatedServices.map((service) => (
            <div
              key={service.id}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-xl hover:scale-[1.03] transition"
            >
              <div className="flex justify-between mb-2">
                <h2 className="text-lg font-semibold">{service.name}</h2>
                <span className="text-yellow-400 text-sm">
                  <StarIcon fontSize="small" /> {service.rating}
                </span>
              </div>

              <p className="text-sm text-gray-300 mb-2">{service.category}</p>

              <p className="text-sm text-gray-400 mb-2">
                <MyLocationIcon fontSize="small" /> {service.cities.join(", ")}
              </p>

              <p className="text-sm text-gray-300">
                <AttachMoneyIcon fontSize="small" />
                {service.price}
              </p>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8 gap-2 flex-wrap">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === i + 1
                  ? "bg-white text-black"
                  : "bg-white/10 border border-white/20"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
        {filteredServices.length === 0 && (
          <p className="text-center text-gray-400 mt-6">🚫 No services found</p>
        )}
      </div>
    </div>
  );
}
