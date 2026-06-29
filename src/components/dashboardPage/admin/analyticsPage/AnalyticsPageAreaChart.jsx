"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const COLORS = ["#2a78d6", "#1baf7a", "#eda100"];

const AnalyticsPageBarChart = ({
  totalPatients = [],
  totalDoctors = [],
  totalAppointments = [],
}) => {
  const data = [
    { name: "Patients", value: totalPatients.length },
    { name: "Doctors", value: totalDoctors.length },
    { name: "Appointments", value: totalAppointments.length },
  ];

  return (
    <div>
      <h3 className="mb-3 text-medium text-lg">
        Patients, Doctors and Appointments Comparison
      </h3>

      <div className="max-w-3xl w-full mx-auto">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
            barSize={64}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e1e0d9"
            />
            <XAxis
              dataKey="name"
              axisLine={{ stroke: "#c3c2b7" }}
              tickLine={false}
              tick={{ fill: "#898781", fontSize: 13 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#898781", fontSize: 12 }}
              allowDecimals={false}
            />
            <Tooltip cursor={{ fillOpacity: 0.08 }} />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsPageBarChart;
