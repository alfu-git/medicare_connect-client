"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaCalendarAlt, FaClock, FaNotesMedical } from "react-icons/fa";
import Link from "next/link";
import { Button } from "@heroui/react";
import { MdKeyboardBackspace } from "react-icons/md";

const AppointmentDetailsCard = ({ appointment }) => {
  const {
    doctorName,
    doctorImage,
    doctorSpecialization,
    appointmentDay,
    appointmentTime,
    symptoms,
    appointmentStatus,
    paymentStatus,
  } = appointment;

  const statusStyle = {
    pending: "bg-yellow-500/10 text-yellow-600",
    confirmed: "bg-green-500/10 text-green-600",
    cancelled: "bg-red-500/10 text-red-600",
  };

  return (
    <>
      <Link
        href={"/dashboard/patient/my-appointments"}
        className="block mb-5 animate__animated animate__fadeInLeft"
      >
        <Button className={"px-0 h-auto bg-transparent text-zinc-700 text-2xl"}>
          <MdKeyboardBackspace className="w-7 h-7" />
          Back
        </Button>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative group max-w-3xl mx-auto p-px rounded-3xl bg-linear-to-r from-[#17a2b8]/30 to-[#0b0b3b]/30"
      >
        {/* Card */}
        <div className="relative rounded-3xl p-8 bg-white/70 backdrop-blur-xl border border-white/30 shadow-lg hover:shadow-2xl transition duration-500">
          {/* Header */}
          <div className="flex items-center justify-between gap-4">
            {/* Doctor Info */}
            <div className="flex items-center gap-5">
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-white shadow-md">
                <Image
                  src={doctorImage}
                  alt={doctorName}
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#0c2f25]">
                  {doctorName}
                </h2>
                <p className="text-sm text-[#6d8276]">{doctorSpecialization}</p>
              </div>
            </div>

            {/* Status */}
            <div className="flex flex-col gap-2 items-end">
              <span
                className={`px-4 py-1 text-xs font-semibold rounded-full ${
                  statusStyle[appointmentStatus] || "bg-gray-100 text-gray-600"
                }`}
              >
                {appointmentStatus.charAt(0).toUpperCase() +
                  appointmentStatus.slice(1)}
              </span>

              <span
                className={`px-4 py-1 text-xs font-semibold rounded-full ${
                  paymentStatus === "paid"
                    ? "bg-green-500/10 text-green-600"
                    : "bg-red-500/10 text-red-600"
                }`}
              >
                {paymentStatus.charAt(0).toUpperCase() + paymentStatus.slice(1)}
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="my-6 h-px bg-linear-to-r from-transparent via-gray-300 to-transparent" />

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Date */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/60 border border-white/40">
              <FaCalendarAlt className="text-[#17a2b8] text-lg" />
              <div>
                <p className="text-xs text-[#6d8276]">Appointment Day</p>
                <p className="text-sm font-semibold text-[#0c2f25]">
                  {appointmentDay}
                </p>
              </div>
            </div>

            {/* Time */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/60 border border-white/40">
              <FaClock className="text-[#17a2b8] text-lg" />
              <div>
                <p className="text-xs text-[#6d8276]">Appointment Time</p>
                <p className="text-sm font-semibold text-[#0c2f25]">
                  {appointmentTime}
                </p>
              </div>
            </div>

            {/* Symptoms (Full width) */}
            <div className="md:col-span-2 flex gap-4 p-4 rounded-2xl bg-white/60 border border-white/40">
              <FaNotesMedical className="text-[#17a2b8] text-lg mt-1" />
              <div>
                <p className="text-xs text-[#6d8276]">Patient Symptoms</p>
                <p className="text-sm text-[#0c2f25] font-medium leading-relaxed">
                  {symptoms}
                </p>
              </div>
            </div>
          </div>

          {/* Hover Glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-linear-to-r from-[#17a2b8]/10 to-[#0b0b3b]/10 rounded-3xl pointer-events-none" />
        </div>
      </motion.div>
    </>
  );
};

export default AppointmentDetailsCard;
