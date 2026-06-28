"use client";

import { capitalizeFirstLetter } from "@/lib/helpers/capitalize-first-letter";
import { Button } from "@heroui/react";
import Link from "next/link";
import React from "react";

const AppointmentCardOfDoctorPrescriptionManagementPage = ({ appointment }) => {
  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="text-lg font-semibold color-tertiary">
          {appointment.patientName}
        </h3>

        <span
          className={`text-xs px-3 py-1 rounded-full font-medium ${
            appointment.appointmentStatus === "pending"
              ? "bg-yellow-100 text-yellow-600"
              : appointment.appointmentStatus === "completed"
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-500"
          }`}
        >
          {capitalizeFirstLetter(appointment.appointmentStatus)}
        </span>
      </div>

      {/* Body */}
      <div className="p-4 space-y-3">
        <p className="text-sm color-muted">
          📅 {appointment.appointmentDay} • {appointment.appointmentTime}
        </p>

        <p className="text-sm">
          <span className="font-medium color-tertiary">Symptoms: </span>
          <span className="color-muted">{appointment.symptoms || "N/A"}</span>
        </p>

        <div className="flex items-center justify-between mt-2">
          <span className="text-sm font-medium color-tertiary">Payment</span>

          <span
            className={`text-xs px-3 py-1 rounded-full font-medium ${
              appointment.paymentStatus === "paid"
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-500"
            }`}
          >
            {capitalizeFirstLetter(appointment.paymentStatus)}
          </span>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-4">
        <Link
          href={`/dashboard/doctor/appointment-requests/${appointment?._id}`}
        >
          <Button className={"w-full rounded-md"}>Create Prescription</Button>
        </Link>
      </div>
    </div>
  );
};

export default AppointmentCardOfDoctorPrescriptionManagementPage;
