"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaCheckCircle, FaCalendarAlt, FaClock } from "react-icons/fa";
import DoctorProfileUpdateModal from "./DoctorProfileUpdateModal";

const DoctorProfileMainContent = ({ doctor, updateDoctorProfileWrapper }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1], // easeInOut cubic-bezier
      }}
      className="max-w-5xl mx-auto p-6"
    >
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Top Section */}
        <div className="bg-primary p-6 flex flex-col md:flex-row items-center gap-6">
          <Image
            src={doctor?.profileImage}
            alt={doctor?.doctorName}
            width={200}
            height={200}
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
          />

          <div className="text-center md:text-left text-white">
            <h2 className="text-2xl font-bold flex items-center gap-2 justify-center md:justify-start">
              {doctor?.doctorName}
              {doctor?.verificationStatus === "verified" && (
                <FaCheckCircle className="text-white text-lg" />
              )}
            </h2>

            <p className="text-sm opacity-90">{doctor?.qualifications}</p>

            <p className="mt-1 text-sm">{doctor?.specialization}</p>

            <p className="mt-1 text-xs opacity-80">{doctor?.hospitalName}</p>
          </div>
        </div>

        {/* Info Section */}
        <div className="p-6 grid md:grid-cols-2 gap-6">
          {/* Left */}
          <div className="space-y-6">
            <div>
              <p className="color-muted text-sm">Experience</p>
              <h4 className="font-semibold text-lg">{doctor?.experience}</h4>
            </div>

            <div>
              <p className="color-muted text-sm">Consultation Fee</p>
              <h4 className="font-semibold text-lg">
                ৳ {doctor?.consultationFee}
              </h4>
            </div>
          </div>

          {/* Right */}
          <div className="space-y-6">
            {/* Available Days */}
            <div>
              <p className="color-muted text-sm flex items-center gap-2">
                <FaCalendarAlt /> Available Days
              </p>

              <div className="flex flex-wrap gap-2">
                {doctor?.availableDays?.map((day, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                  >
                    {day}
                  </span>
                ))}
              </div>
            </div>

            {/* Available Slots */}
            <div>
              <p className="color-muted text-sm flex items-center gap-2">
                <FaClock /> Available Slots
              </p>

              <div className="flex flex-wrap gap-2">
                {doctor?.availableSlots?.map((slot, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm"
                  >
                    {slot}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-6 border-t flex justify-end">
          <DoctorProfileUpdateModal
            doctor={doctor}
            updateDoctorProfileWrapper={updateDoctorProfileWrapper}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default DoctorProfileMainContent;
