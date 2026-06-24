"use client";

import React from "react";
import { motion } from "framer-motion";
import { TbCurrencyTaka } from "react-icons/tb";
import CountUpValue from "@/components/shared/CountUpValue";
import { FaMoneyBillWave } from "react-icons/fa";

const PaymentHistoryPageHeading = ({ payments }) => {
  const totalPayments = payments.reduce(
    (sum, item) => sum + Number(item.consultationFee || 0),
    0,
  );

  const statsData = [
    {
      title: "Total Payments",
      value: totalPayments,
      icon: FaMoneyBillWave,
      color: "from-[#0b0b3b] to-[#17a2b8]",
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row justify-between gap-6">
      {/* title */}
      <div className="animate__animated animate__fadeInLeft">
        <h2 className="text-2xl font-bold">Payment History</h2>

        <p className="color-muted">
          View and manage your transaction records for all medical
          consultations.
        </p>
      </div>

      {/* stats */}
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
            <div className="relative z-10 flex gap-10 items-center justify-between">
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

export default PaymentHistoryPageHeading;
