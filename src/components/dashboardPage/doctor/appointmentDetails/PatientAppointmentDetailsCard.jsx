"use client";

import Image from "next/image";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import { CalendarDays, Clock } from "lucide-react";
import { capitalizeFirstLetter } from "@/lib/helpers/capitalize-first-letter";

const PatientAppointmentDetailsCard = ({ appointment }) => {
  if (!appointment) return null;

  const {
    appointmentDay,
    appointmentTime,
    symptoms,
    appointmentStatus,
    paymentStatus,
    patientName,
    patientImage,
  } = appointment;

  const statusColor =
    appointmentStatus === "pending"
      ? "bg-yellow-100 text-yellow-600"
      : appointmentStatus === "approved"
        ? "bg-green-100 text-green-600"
        : "bg-red-100 text-red-600";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
    >
      {/* Patient Info */}
      <div className="flex items-center gap-3 mb-4">
        <div className="relative w-10 h-10">
          <Image
            src={patientImage}
            alt="patient"
            fill
            className="rounded-full object-cover"
          />
        </div>
        <p className="text-sm color-secondary font-medium">
          Patient: {patientName}
        </p>
      </div>

      {/* Appointment Info */}
      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div className="flex items-center gap-2 color-muted">
          <CalendarDays size={16} />
          {appointmentDay}
        </div>

        <div className="flex items-center gap-2 color-muted">
          <Clock size={16} />
          {appointmentTime}
        </div>
      </div>

      {/* Symptoms */}
      <div className="mb-4">
        <p className="text-sm font-semibold color-tertiary mb-1">Symptoms</p>
        <p className="text-sm color-muted bg-gray-50 p-3 rounded-xl">
          {symptoms}
        </p>
      </div>

      {/* Status */}
      <div className="flex items-center justify-between mb-5">
        <span
          className={`text-xs px-3 py-1 rounded-full font-medium ${statusColor}`}
        >
          {capitalizeFirstLetter(appointmentStatus)}
        </span>

        <span
          className={`text-xs px-3 py-1 rounded-full font-medium ${
            paymentStatus === "paid"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-500"
          }`}
        >
          {capitalizeFirstLetter(paymentStatus)}
        </span>
      </div>

      {/* Action Button */}
      <Button className="w-full bg-primary text-white font-semibold rounded-xl hover:opacity-90 transition">
        Write Prescription
      </Button>
    </motion.div>
  );
};

export default PatientAppointmentDetailsCard;
