import Footer from "@/component/Footer";
import Header from "@/component/Header";
import WeatherContent from "@/component/Weather/WeatherContent";
import React from "react";
function HomePage() {
  return (
    <div className="flex bg-linear-to-br from-slate-900 via-indigo-900 to-purple-950 text-white p-5">
      <Header />
      <div className="flex flex-col flex-1 relative z-10">
        <main className="flex-1 border-white flex justify-start items-start px-6 py-6">
          <WeatherContent />
        </main>
        <Footer />
      </div>
    </div>
  );
}
export default HomePage;
