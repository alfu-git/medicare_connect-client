"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import React from "react";

const PrescriptionCardOfDoctorPrescriptionManagement = ({ prescription }) => {
  // Safe destructuring with fallback values
  const {
    doctorName = "Unknown Doctor",
    doctorSpecialization = "General Physician",
    patientName = "Unknown Patient",
    patientAge = "N/A",
    patientGender = "N/A",
    diagnosis = "Not specified",
    medicines = "None",
    advice = "No advice provided",
    appointmentDay = "",
    appointmentTime = "",
  } = prescription || {};

  const handleModify = () => {
    // Modify button এর অ্যাকশন এখানে হবে
    console.log("Modifying prescription:", prescription?._id);
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full group relative overflow-hidden">
      {/* Top Section: Header & Appointment Info */}
      <div>
        <div className="flex justify-between items-start gap-4 mb-5">
          <div>
            <span className="px-3 text-[11px] font-bold tracking-wider uppercase bg-[#17a2b8]/10 text-[#17a2b8] py-1 rounded-md">
              {doctorSpecialization}
            </span>

            <h3 className="text-lg font-bold text-[#0c2f25] mt-2 group-hover:text-[#17a2b8] transition-colors duration-200">
              {doctorName}
            </h3>
          </div>

          {/* Appointment Badge */}
          {(appointmentDay || appointmentTime) && (
            <div className="text-right bg-[#F6F6F6] px-3 py-1.5 rounded-xl border border-gray-100">
              <p className="text-xs font-semibold text-[#0b0b3b]">
                {appointmentDay}
              </p>
              <p className="text-[11px] text-[#6d8276]">{appointmentTime}</p>
            </div>
          )}
        </div>

        <hr className="border-gray-100 my-4" />

        {/* Patient Core Info */}
        <div className="bg-[#F6F6F6]/60 p-3.5 rounded-xl mb-5 flex flex-wrap gap-y-2 items-center justify-between text-sm">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-[#6d8276] block font-medium">
              Patient
            </span>
            <span className="font-bold text-[#0b0b3b] text-base">
              {patientName}
            </span>
          </div>
          <div className="flex gap-4 text-right">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#6d8276] block font-medium">
                Age
              </span>
              <span className="font-semibold text-[#0c2f25]">
                {patientAge} Yrs
              </span>
            </div>
            <div className="border-l border-gray-200 pl-4">
              <span className="text-[11px] uppercase tracking-wider text-[#6d8276] block font-medium">
                Gender
              </span>
              <span className="font-semibold text-[#0c2f25]">
                {patientGender}
              </span>
            </div>
          </div>
        </div>

        {/* Medical Details */}
        <div className="space-y-4">
          {/* Diagnosis */}
          <div>
            <span className="text-xs font-bold text-[#6d8276] uppercase tracking-wider block mb-1">
              Diagnosis
            </span>
            <p className="text-sm font-medium bg-red-50/40 text-red-700 inline-block px-3 rounded-md border border-red-100/50 capitalize">
              {diagnosis}
            </p>
          </div>

          {/* Medicines */}
          <div className="mt-2">
            <span className="text-xs font-bold text-[#6d8276] uppercase tracking-wider block mb-1">
              Prescribed Medicine
            </span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#17a2b8]"></span>
              <p className="text-sm font-semibold text-[#0b0b3b] capitalize">
                {medicines}
              </p>
            </div>
          </div>

          {/* Advice */}
          <div className="mt-2">
            <span className="text-xs font-bold text-[#6d8276] uppercase tracking-wider block mb-1">
              Doctor&apos;s Advice
            </span>

            <p className="text-sm italic text-[#6d8276] bg-[#F6F6F6] py-1 px-3 rounded-lg border-l-2 border-[#6d8276]">
              &quot;{advice}&quot;
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Section: Premium Action Button */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <Link
          href={`/dashboard/doctor/prescription-management/${prescription?._id}`}
        >
          <Button
            onClick={handleModify}
            className="w-full bg-[#17a2b8] hover:bg-[#0b0b3b] text-white font-semibold text-sm py-3 px-4 rounded-xl transition-all duration-300 shadow-xs hover:shadow-lg active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
          >
            Update Prescription
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PrescriptionCardOfDoctorPrescriptionManagement;
