"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@heroui/react";
import { FaStethoscope } from "react-icons/fa";
import Link from "next/link";

const NotFoundPageContent = () => {
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
        <FaStethoscope className="text-4xl text-[#17a2b8]" />
      </motion.div>

      {/* 404 Text */}
      <h1 className="text-7xl font-extrabold bg-linear-to-r from-[#17a2b8] to-[#0b0b3b] text-transparent bg-clip-text">
        404
      </h1>

      {/* Title */}
      <h2 className="text-2xl font-semibold mt-4 text-[#0c2f25]">
        Page Not Found
      </h2>

      {/* Description */}
      <p className="text-[#6d8276] mt-2">
        Oops! The page you are looking for doesn&apos;t exist or has been moved.
      </p>

      {/* Button */}
      <Link href="/">
        <Button className="mt-6 bg-[#17a2b8] hover:bg-[#138496] text-white px-6 py-2 rounded-xl shadow-md">
          Go Back Home
        </Button>
      </Link>
    </motion.div>
  );
};

export default NotFoundPageContent;
