"use client";

import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import React from "react";

const AdminDashboardHomeAppointmentsChart = ({ totalAppointments }) => {
  // 👉 Week wise count object
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const dayShort = {
    Sunday: "Sun",
    Monday: "Mon",
    Tuesday: "Tue",
    Wednesday: "Wed",
    Thursday: "Thurs",
    Friday: "Fri",
    Saturday: "Sat",
  };

  // 👉 count calculation
  const appointmentCountByDay = days.map((day) => {
    const count = totalAppointments.filter(
      (appointment) => appointment.appointmentDay === day,
    ).length;

    return {
      name: dayShort[day],
      appointments: count,
    };
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white/60 backdrop-blur-md p-6 rounded-2xl shadow-md"
    >
      <h2 className="text-lg font-semibold mb-4 color-tertiary">
        Appointments Overview
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={appointmentCountByDay}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="appointments" fill="#0b0b3b" />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default AdminDashboardHomeAppointmentsChart;
