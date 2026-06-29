"use client";

import React from "react";

const AdminDashboardHomeHeading = () => {
  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning ☀️";
    if (hour < 18) return "Good Afternoon 🌤️";
    return "Good Evening 🌙";
  };

  return (
    <div className="mb-7.5 animate__animated animate__fadeInLeft">
      <h2 className="text-2xl font-bold text-gray-800">
        {getGreeting()}, Admin 👋
      </h2>

      <p className="text-sm text-gray-500 mt-1">
        Welcome back to your dashboard. Here’s what’s happening with your
        platform today.
      </p>
    </div>
  );
};

export default AdminDashboardHomeHeading;
