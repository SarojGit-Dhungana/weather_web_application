"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { weatherAPI } from "@/fake-data/fake_weather_data";
import { servicesAPI } from "@/fake-data/fake_service_data";
import Header from "@/component/Header";
import Footer from "@/component/Footer";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import StarIcon from "@mui/icons-material/Star";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

export default function WeatherDetailPage() {
  const { id } = useParams();
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    const foundWeather = weatherAPI.find((item) => item.id === Number(id));
    setWeather(foundWeather);
    setLoading(false);
  }, [id]);

  if (loading) {
    return <p className="text-white p-10">Loading...</p>;
  }

  if (!weather) {
    return <p className="text-red-400 p-10">Weather not found</p>;
  }

  const filteredServices = servicesAPI
    .filter((service) => service.cities.includes(weather.city))
    .sort((a, b) => b.rating - a.rating);

  return (
    <div className="flex h-screen bg-linear-to-br from-slate-900 via-indigo-900 to-purple-950 text-white p-5">
      <Header />
      <div className="flex flex-col flex-1 relative z-10 overflow-y-auto">
        <main className="flex-1 flex flex-col items-start px-6">
          <div className="w-full px-6 py-5 text-white">
            <h1 className="text-4xl font-bold mb-8 flex items-center gap-3">
              <LocationCityIcon fontSize="large" />
              {weather.city}, {weather.country}
            </h1>
            <div className="w-full bg-linear-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 shadow-2xl max-w-full border-2 border-white/20">
              <div className="flex justify-between items-center mb-10">
                <div>
                  <p className="text-6xl font-extrabold">{weather.temp}°C</p>
                  <p className="text-lg text-gray-300 mt-2">
                    {weather.condition}
                  </p>
                </div>
                <div className="text-6xl">🌥</div>
              </div>
              <div className="border-t border-white/20 my-6"></div>
              <div className="grid grid-cols-2 gap-6 ">
                <div className="bg-white/5 p-4 rounded-xl">
                  <p className="text-sm text-gray-400">Humidity</p>
                  <p className="text-xl font-semibold">
                    💧 {weather.humidity}%
                  </p>
                </div>
                <div className="bg-white/5 p-4 rounded-xl">
                  <p className="text-sm text-gray-400">Wind Speed</p>
                  <p className="text-xl font-semibold">
                    💨 {weather.wind} km/h
                  </p>
                </div>

                <div className="bg-white/5 p-4 rounded-xl">
                  <p className="text-sm text-gray-400">Feels Like</p>
                  <p className="text-xl font-semibold">
                    🌡 {weather.temp || "--"}°C
                  </p>
                </div>

                <div className="bg-white/5 p-4 rounded-xl">
                  <p className="text-sm text-gray-400">Condition</p>
                  <p className="text-xl font-semibold">
                    📊 {weather.condition}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 max-w-full">
              <h2 className="text-2xl font-semibold mb-6">
                Services in {weather.city}
              </h2>

              {filteredServices.length === 0 ? (
                <p className="text-gray-400 italic">
                  No services available in this city yet
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {filteredServices.map((service) => (
                    <div
                      key={service.id}
                      className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4 hover:scale-[1.03] transition duration-300"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-semibold">
                          {service.name}
                        </h3>
                        <span className="text-yellow-400 px-2 py-2 flex gap-1 text-md font-medium ">
                          <StarIcon fontSize="small" />
                          <span className="-mt-1">{service.rating}</span>
                        </span>
                      </div>

                      <span className="text-xs bg-white/20 px-2 py-1 rounded-lg inline-block mb-2">
                        {service.category}
                      </span>

                      <div className="flex justify-between font-medium text-gray-300 mt-2">
                        <span>
                          <AttachMoneyIcon fontSize="small" />
                          {service.price}
                        </span>
                        <span>
                          <MyLocationIcon fontSize="small" /> {weather.city}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
