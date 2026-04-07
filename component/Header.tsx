"use client";
import React from "react";
import Link from "next/link";
import AirIcon from "@mui/icons-material/Air";
import MapIcon from "@mui/icons-material/Map";
import SettingsIcon from "@mui/icons-material/Settings";
import SunnySnowingIcon from "@mui/icons-material/SunnySnowing";

const headerItems = [
  {
    item: "Weather",
    href: "/weather",
    icon: <SunnySnowingIcon fontSize="small" />,
  },
  {
    item: "Services",
    href: "/service",
    icon: <MapIcon fontSize="small" />,
  },
  {
    item: "Settings",
    href: "/setting",
    icon: <SettingsIcon fontSize="small" />,
  },
];

export default function Header() {
  return (
    <>
      <div className="md:hidden w-full flex items-center justify-between px-4 py-3 border-b border-gray-700">
        <Link href={"/"}>
          <AirIcon className="text-gray-300" />
        </Link>
        <div className="flex gap-6">
          {headerItems.map((link) => (
            <Link
              key={link.item}
              href={link.href}
              className="flex flex-col items-center text-xs text-gray-200"
            >
              {link.icon}
              {link.item}
            </Link>
          ))}
        </div>
      </div>

      <div className="hidden md:flex flex-col h-9/12 w-20 rounded-xl bg-transparent border border-gray-600 shadow-2xl mr-2 py-10 items-center px-10">
        <Link href={"/"} className="mb-8">
          <AirIcon fontSize="large" className="text-gray-300" />
        </Link>
        <nav className="flex flex-col gap-6">
          {headerItems.map((link) => (
            <Link
              key={link.item}
              href={link.href}
              className="flex flex-col items-center text-sm text-gray-200 hover:text-white transition"
            >
              {link.icon}
              <span className="text-xs mt-1">{link.item}</span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
