"use client";

import { motion } from "framer-motion";
import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import React, { useMemo } from "react";

const COLORS = ["#17a2b8", "#0b0b3b", "#0c2f25", "#6d8276"];

const AdminDashboardHomeDoctorCategoryChart = ({ totalDoctors }) => {
  console.log(totalDoctors);

  // ✅ Dynamic Doctor Category Data (CLEAN + OPTIMIZED)
  const doctorPerformance = useMemo(() => {
    if (!Array.isArray(totalDoctors) || totalDoctors.length === 0) {
      return [];
    }

    const categoryCount = totalDoctors.reduce((acc, doctor) => {
      const category = doctor?.specialization || "Others";

      acc[category] = (acc[category] || 0) + 1;

      return acc;
    }, {});

    return Object.entries(categoryCount).map(([name, value]) => ({
      name,
      value,
    }));
  }, [totalDoctors]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      className="mt-10 bg-white/60 backdrop-blur-md p-6 rounded-2xl shadow-md"
    >
      <h2 className="text-lg font-semibold mb-4 color-tertiary">
        Doctor Category
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={doctorPerformance}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {doctorPerformance.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default AdminDashboardHomeDoctorCategoryChart;
