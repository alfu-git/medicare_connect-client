"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaCalendarAlt, FaClock } from "react-icons/fa";

const PatientAppointmentsContainer = ({ appointments }) => {
  return (
    <div className="mt-10 space-y-6">
      {appointments.map((appointment, index) => (
        <motion.div
          key={appointment?._id}
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: index * 0.15,
            ease: "easeOut",
          }}
          viewport={{ once: false }}
          className="group relative overflow-hidden rounded-3xl p-px bg-linear-to-r from-[#17a2b8]/30 to-[#0b0b3b]/30"
        >
          {/* Glass Card */}
          <div className="relative flex justify-between p-5 rounded-3xl backdrop-blur-xl bg-white/70 border border-white/30 shadow-lg hover:shadow-2xl transition-all duration-500">
            {/* Glow Hover Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-linear-to-r from-[#17a2b8]/10 to-[#0b0b3b]/10 rounded-3xl" />

            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              {/* Doctor Image */}
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-white shadow-md">
                <Image
                  src={appointment?.doctorImage}
                  alt="doctor"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[#0c2f25]">
                  {appointment?.doctorName}
                </h3>

                <p className="text-sm text-[#6d8276]">
                  {appointment?.doctorSpecialization}
                </p>

                {/* Date & Time */}
                <div className="flex items-center gap-4 mt-2 text-sm text-[#0c2f25]">
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-[#17a2b8]" />
                    {appointment?.appointmentDay}
                  </div>

                  <div className="flex items-center gap-2">
                    <FaClock className="text-[#17a2b8]" />
                    {appointment?.appointmentTime}
                  </div>
                </div>
              </div>
            </div>

            {/* Status Badge */}
            <div className="max-w-fit max-h-fit px-3 py-1 text-xs font-medium rounded-full bg-[#17a2b8]/10 text-[#17a2b8]">
              {appointment?.appointmentStatus.charAt(0).toUpperCase() +
                appointment?.appointmentStatus.slice(1)}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default PatientAppointmentsContainer;
