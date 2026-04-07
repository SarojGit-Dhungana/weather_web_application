"use client";
import React from "react";
import Link from "next/link";
import AirIcon from "@mui/icons-material/Air";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import MapIcon from "@mui/icons-material/Map";
import SettingsIcon from "@mui/icons-material/Settings";
import SunnySnowingIcon from "@mui/icons-material/SunnySnowing";
const headerItems = [
  {
    item: "Weather",
    href: "/weather",
    icon: <SunnySnowingIcon fontSize="small" />,
  },
  { item: "Services", href: "/service", icon: <MapIcon fontSize="small" /> },
  {
    item: "Settings",
    href: "/setting",
    icon: <SettingsIcon fontSize="small" />,
  },
];

export default function Header() {
  return (
    <div className=" h-9/12 w-20 rounded-xl bg-transparent border border-gray-600 shadow-2xl flex flex-col mr-2 py-10">
      <h1 className="text-center font-semibold">
        <Link href={"/"}>
          <AirIcon fontSize="large" className="text-gray-300 font-bold" />
        </Link>
      </h1>
      <nav className="flex-1 py-4 gap-10">
        <div className="space-y-1">
          {headerItems.map((link) => (
            <Link
              key={link.item}
              href={link.href}
              className="block py-4 px-3 w-auto text-s
              m text-blue-50 text-center rounded-lg hover:text-gray-200"
            >
              <span>{link.icon}</span>
              <br />
              {link.item}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
