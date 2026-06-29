"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaUserLock } from "react-icons/fa";
import { useRouter } from "next/navigation";

const UnauthorizedPageContent = ({ role = "User" }) => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F6F6F6] px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Animated Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="flex justify-center mb-6"
        >
          <div className="bg-primary p-6 rounded-full shadow-xl">
            <FaUserLock className="text-white text-5xl" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Access Denied 🚫
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg color-muted mb-6"
        >
          You are logged in as{" "}
          <span className="font-semibold color-primary">{role}</span>, but this
          area is restricted for another role.
        </motion.p>

        {/* Fancy Warning Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-[#17a2b8] mb-6"
        >
          <p className="color-muted">
            ⚠️ Only authorized users can access this dashboard. Please go back
            to your own panel or contact admin if you think this is a mistake.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => router.back()}
            className="px-6 py-3 rounded-lg bg-secondary text-white hover:opacity-90 transition"
          >
            ⬅ Go Back
          </button>

          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 rounded-lg bg-primary text-white hover:opacity-90 transition"
          >
            🏠 Go Home
          </button>
        </motion.div>

        {/* Floating Background Blur Animation */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <motion.div
            animate={{ x: [0, 50, -50, 0], y: [0, 30, -30, 0] }}
            transition={{ duration: 12, repeat: Infinity }}
            className="w-72 h-72 bg-primary opacity-20 rounded-full blur-3xl absolute top-10 left-10"
          />
          <motion.div
            animate={{ x: [0, -40, 40, 0], y: [0, -20, 20, 0] }}
            transition={{ duration: 15, repeat: Infinity }}
            className="w-72 h-72 bg-secondary opacity-20 rounded-full blur-3xl absolute bottom-10 right-10"
          />
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPageContent;
