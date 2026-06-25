"use client";

import React from "react";
import { FaRegStar } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import { TbCurrencyTaka, TbUsers } from "react-icons/tb";
import { motion } from "framer-motion";
import CountUpValue from "@/components/shared/CountUpValue";

const DoctorDashboardHomeStats = ({
  patients = [],
  reviews = [],
  totalRevenue = 0,
}) => {
  const statsData = [
    {
      title: "Total Patients",
      value: patients.length,
      icon: TbUsers,
      color: "from-[#17a2b8] to-[#0c2f25]",
    },
    {
      title: "Reviews Received",
      value: reviews.length,
      icon: FaRegStar,
      color: "from-[#0b0b3b] to-[#17a2b8]",
    },
    {
      title: "Total Revenue",
      value: totalRevenue,
      icon: GiMoneyStack,
      color: "from-green-400 to-emerald-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {statsData.map((stat, index) => {
        const Icon = stat.icon;

        return (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            transition={{
              duration: 0.5,
            }}
            className="relative rounded-3xl p-6 overflow-hidden backdrop-blur-xl bg-white/60 border border-white/30 shadow-lg animate__animated animate__zoomIn"
          >
            {/* Gradient Glow */}
            <div
              className={`absolute inset-0 opacity-20 bg-linear-to-br ${stat.color}`}
            ></div>

            {/* Animated Background Blur Circle */}
            <motion.div
              animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 6 }}
              className="absolute -top-10 -right-10 w-32 h-32 bg-primary/30 rounded-full blur-3xl"
            />

            {/* Content */}
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium color-muted">
                  {stat.title}
                </h4>

                <motion.h2
                  key={stat.value}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className={`text-3xl font-bold mt-2 color-secondary ${stat.title === "Total Payments" && "flex items-center"}`}
                >
                  {stat.title === "Total Payments" && (
                    <TbCurrencyTaka className="-ml-1.5" />
                  )}
                  <CountUpValue value={stat.value} duration={2} />
                </motion.h2>
              </div>

              <div
                className={`p-4 rounded-2xl bg-linear-to-br ${stat.color} text-white shadow-md`}
              >
                <Icon size={22} />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default DoctorDashboardHomeStats;
