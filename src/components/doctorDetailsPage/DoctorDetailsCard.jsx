"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaCheckCircle, FaRegDotCircle } from "react-icons/fa";
import { IoCalendarOutline } from "react-icons/io5";
import { MdAccessTime, MdBlock } from "react-icons/md";
import { LuHospital } from "react-icons/lu";
import { HiOutlineCurrencyBangladeshi } from "react-icons/hi";
import AppointmentModal from "./AppointmentModal";

const DoctorDetailsCard = ({ doctor }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: false }}
      className="relative z-0 max-w-5xl mx-auto bg-white backdrop-blur-xl rounded-3xl shadow-2xl p-6 md:p-10 grid lg:grid-cols-3 gap-8"
    >
      {/* pending state overlay */}
      {doctor?.verificationStatus === "pending" && (
        <div className="absolute z-50 inset-0 bg-white/60 backdrop-blur-sm flex flex-col items-center justify-center rounded-3xl">
          <FaRegDotCircle className="text-3xl text-yellow-500 mb-2" />

          <p className="text-xl font-semibold text-yellow-600">
            Awaiting Approval
          </p>

          <p className="text-sm text-gray-600 mt-1 text-center px-4">
            This doctor profile is under review. You’ll be able to book once
            it&apos;s approved.
          </p>
        </div>
      )}

      {/* suspend state overlay */}
      {doctor?.verificationStatus === "suspended" && (
        <div className="absolute z-50 inset-0 bg-white/60 backdrop-blur-sm flex flex-col items-center justify-center rounded-3xl text-center">
          <MdBlock className="text-4xl text-red-600 mb-2" />
          <p className="text-xl font-semibold text-red-600">Doctor Suspended</p>
          <p className="text-sm text-gray-600 mt-1">
            This doctor is currently unavailable for appointments
          </p>
        </div>
      )}

      {/* LEFT SIDE - IMAGE */}
      <div className="lg:col-span-1 flex flex-col items-center">
        <Image
          src={doctor?.profileImage}
          alt={doctor?.doctorName}
          width={300}
          height={300}
          className="rounded-2xl object-cover h-72 w-full"
        />

        {/* Verification */}
        <div
          className={`mt-4 px-2 py-0.5 text-sm rounded-full flex items-center gap-1.5 border ${doctor?.verificationStatus === "pending" ? "text-yellow-500 bg-yellow-500/20 border-yellow-500/80" : doctor?.verificationStatus === "verified" ? "text-green-500 bg-green-500/20 border-green-500/80" : "text-red-500 bg-red-500/20 border-red-500/80"}`}
        >
          {doctor?.verificationStatus === "pending" ? (
            <FaRegDotCircle />
          ) : doctor?.verificationStatus === "verified" ? (
            <FaCheckCircle />
          ) : (
            <MdBlock />
          )}

          <span className="font-medium capitalize">
            {doctor?.verificationStatus}
          </span>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="lg:col-span-2 flex flex-col justify-between">
        {/* Top Info */}
        <div>
          <h2 className="text-3xl font-bold mb-2">{doctor?.doctorName}</h2>

          <p className="text-lg font-semibold text-primary mb-1">
            {doctor?.specialization}
          </p>

          <p className="text-gray-600 mb-3">{doctor?.qualifications}</p>

          <p className="text-gray-500 mb-2 flex gap-1 items-center">
            <LuHospital /> <span>{doctor?.hospitalName}</span>
          </p>

          <div className="flex gap-6 mt-4">
            <div>
              <p className="text-sm text-gray-500">Experience</p>
              <p className="font-semibold">{doctor?.experience}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Consultation Fee</p>
              <p className="font-semibold text-primary flex gap-0.5 items-center">
                <HiOutlineCurrencyBangladeshi />{" "}
                <span>{doctor?.consultationFee}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Availability */}
        <div className="mt-6">
          <div className="flex items-center gap-2 mb-2">
            <IoCalendarOutline />
            <span className="font-semibold">Available Days</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {doctor?.availableDays?.map((day, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-[#eef2ff] text-sm rounded-full"
              >
                {day}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 mt-4 mb-2">
            <MdAccessTime />
            <span className="font-semibold">Available Slots</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {doctor?.availableSlots?.map((slot, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-[#f0fdf4] text-sm rounded-full"
              >
                {slot}
              </span>
            ))}
          </div>
        </div>

        {/* CTA BUTTON */}
        <div className="mt-8">
          <AppointmentModal doctor={doctor} />
        </div>
      </div>
    </motion.div>
  );
};

export default DoctorDetailsCard;
