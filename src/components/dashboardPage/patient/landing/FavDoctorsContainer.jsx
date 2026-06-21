"use client";

import React from "react";
import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";

const FavDoctorsContainer = ({ favDoctors }) => {
  return (
    <div className="flex flex-col gap-4">
      {favDoctors?.map((favDoctor) => (
        <motion.div
          key={favDoctor?._id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -8, scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className="relative rounded-3xl p-px bg-linear-to-br from-[#17a2b8]/30 via-white/40 to-[#0b0b3b]/20 shadow-xl hover:shadow-2xl w-full"
        >
          {/* Glass Card */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-5 h-full flex flex-col items-center text-center">
            {/* Favorite Icon */}
            <div className="absolute top-4 right-4 bg-white shadow-md rounded-full p-2">
              <FaHeart className="text-red-500 text-sm" />
            </div>

            {/* Doctor Image */}
            <div className="relative w-24 h-24 mb-4">
              <Image
                src={favDoctor?.doctorImage}
                alt={favDoctor?.doctorName}
                fill
                className="rounded-full object-cover border-4 border-[#17a2b8]/30"
              />
            </div>

            {/* Doctor Name */}
            <h3 className="text-lg font-semibold text-[#0c2f25]">
              {favDoctor?.doctorName}
            </h3>

            {/* Specialization */}
            <p className="text-sm text-[#6d8276] mt-1">
              {favDoctor?.specialization || "Cardiologist"}
            </p>

            {/* Bottom Accent */}
            <div className="mt-4 w-full h-0.5 bg-linear-to-r from-transparent via-[#17a2b8] to-transparent opacity-60" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default FavDoctorsContainer;
