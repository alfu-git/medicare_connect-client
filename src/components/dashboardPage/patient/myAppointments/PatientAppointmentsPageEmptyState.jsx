"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaCalendarPlus } from "react-icons/fa";
import { Button } from "@heroui/react";
import Link from "next/link";

const PatientAppointmentsPageEmptyState = () => {
  return (
    <div className="min-h-screen mx- flex flex-col items-center justify-center text-center">
      {/* Card Wrapper */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-w-xl p-px rounded-3xl bg-linear-to-r from-[#17a2b8]/30 to-[#0b0b3b]/30 group"
      >
        {/* Glass Card */}
        <div className="relative rounded-3xl backdrop-blur-xl bg-white/70 border border-white/30 shadow-xl px-8 py-12">
          {/* Glow Hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-linear-to-r from-[#17a2b8]/10 to-[#0b0b3b]/10 rounded-3xl" />

          {/* Title */}
          <h2 className="text-2xl font-semibold text-[#0c2f25]">
            No Appointments Yet
          </h2>

          {/* Description */}
          <p className="mt-2 text-sm text-[#6d8276] max-w-md mx-auto">
            It&apos;s like you haven&apos;t booked any appointments yet. Start
            your healthcare journey by booking your first consultation.
          </p>

          {/* CTA Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/doctors")}
            className="mt-6"
          >
            <Link href={"/find-doctors"}>
              <Button
                className={
                  " 2 px-5 rounded-xl bg-[#17a2b8] text-white text-sm font-medium shadow-md hover:shadow-lg transition"
                }
              >
                <FaCalendarPlus />
                Book Appointment
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default PatientAppointmentsPageEmptyState;
