"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@heroui/react";
import { FaHeartbeat } from "react-icons/fa";
import Link from "next/link";

const ErrorPageContent = ({ reset }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative max-w-xl w-full text-center bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl p-10 border border-gray-200"
    >
      {/* Floating Icon */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="flex justify-center mb-4"
      >
        <FaHeartbeat className="text-4xl text-red-500" />
      </motion.div>

      {/* Error Code */}
      <h1 className="text-6xl font-extrabold bg-linear-to-r from-red-500 to-[#0b0b3b] text-transparent bg-clip-text">
        500
      </h1>

      {/* Title */}
      <h2 className="text-2xl font-semibold mt-4 text-[#0c2f25]">
        Something went wrong
      </h2>

      {/* Description */}
      <p className="text-[#6d8276] mt-2">
        Oops! Something went wrong on our end. Please try again or return to the
        homepage.
      </p>

      {/* Buttons */}
      <div className="flex gap-4 justify-center mt-6 flex-wrap">
        <Button
          onClick={() => reset()}
          className="bg-[#17a2b8] hover:bg-[#138496] text-white px-6 py-2 rounded-xl shadow-md"
        >
          Try Again
        </Button>

        <Link href="/">
          <Button
            variant="bordered"
            className="border-[#0b0b3b] text-[#0b0b3b] px-6 py-2 rounded-xl"
          >
            Go Home
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};

export default ErrorPageContent;
