"use client";

import React, { useState } from "react";

export default function ProfileSettings() {
  const [user, setUser] = useState({
    name: "Demo User",
    email: "demouser@gmail.com",
    city: "Kathmandu",
  });

  return (
    <div className="grid grid-cols-1">
      <h1 className="text-3xl font-bold mb-6">👤 Profile Settings</h1>
      <div className="max-w-lg bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 ">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-xl font-bold">
            {user.name.charAt(0)}
          </div>
          <div>
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm text-gray-400">{user.email}</p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-400">Full Name</label>
            <input
              type="text"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="w-full mt-1 px-3 py-2 rounded-lg bg-white/10 border border-white/10 focus:border-white/30 outline-none"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400">Email</label>
            <input
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full mt-1 px-3 py-2 rounded-lg bg-white/10 border border-white/10 focus:border-white/30 outline-none"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400">City</label>
            <input
              type="text"
              value={user.city}
              onChange={(e) => setUser({ ...user, city: e.target.value })}
              className="w-full mt-1 px-3 py-2 rounded-lg bg-white/10 border border-white/10 focus:border-white/30 outline-none"
            />
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button className="flex-1 py-2 rounded-lg bg-white text-black font-medium hover:bg-gray-200 transition">
            Save
          </button>
          <button className="flex-1 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
