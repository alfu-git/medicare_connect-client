"use client";

import React from "react";
import { motion } from "framer-motion";

const EmptyStateForPatientAppointments = ({ tab }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      {/* Animated Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="w-24 h-24 rounded-full bg-linear-to-r from-[#17a2b8]/20 to-[#0b0b3b]/20 flex items-center justify-center mb-6"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-4xl"
        >
          📅
        </motion.div>
      </motion.div>

      {/* Text */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-xl font-semibold text-[#0c2f25]"
      >
        No {tab} appointments found
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-sm text-gray-500 mt-2"
      >
        {tab === "pending" &&
          "You don’t have any pending appointments right now."}
        {tab === "completed" && "No completed appointments yet. Keep going!"}
        {tab === "rejected" &&
          "No rejected appointments. That’s a good sign 😄"}
      </motion.p>

      {/* Floating Glow */}
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ repeat: Infinity, duration: 3 }}
        className="absolute w-72 h-72 bg-linear-to-r from-[#17a2b8]/10 to-[#0b0b3b]/10 blur-3xl rounded-full -z-10"
      />
    </div>
  );
};

export default EmptyStateForPatientAppointments;
