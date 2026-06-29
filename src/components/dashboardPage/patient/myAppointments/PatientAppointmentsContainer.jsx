"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import { Button } from "@heroui/react";
import DeleteAlertDialog from "@/components/shared/DeleteAlertDialog";
import { deleteAppointment } from "@/lib/actions/appointment";
import RescheduleModal from "./RescheduleModal";
import Link from "next/link";
import EmptyStateForPatientAppointments from "./EmptyStateForPatientAppointments";

const PatientAppointmentsContainer = ({ appointments }) => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("pending"); // ✅ added

  // ✅ added filtered data
  const filteredAppointments = appointments.filter(
    (appointment) => appointment.appointmentStatus === activeTab,
  );

  const handleDelete = async (appointmentId) => {
    try {
      setLoading(true);
      const res = await deleteAppointment(appointmentId);

      if (res?.deletedCount > 0) {
        toast.success("Appointment Cancel Successful");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ✅ Tabs (Right aligned) */}
      <div className="flex justify-end gap-3 mt-5">
        {["pending", "completed", "rejected"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1 rounded-full text-sm font-medium transition ${
              activeTab === tab
                ? "bg-secondary text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {filteredAppointments.length === 0 ? (
        <EmptyStateForPatientAppointments tab={activeTab} />
      ) : (
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredAppointments.map(
            (
              appointment,
              index, // ✅ changed
            ) => (
              <motion.div
                key={appointment?._id}
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: "easeOut",
                }}
                className="group relative overflow-hidden rounded-3xl p-px bg-linear-to-r from-[#17a2b8]/30 to-[#0b0b3b]/30"
              >
                {/* Card */}
                <div className="relative p-6 rounded-3xl backdrop-blur-xl bg-white/70 border border-white/30 shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col justify-between h-full">
                  {/* Top Section */}
                  <div className="flex items-start justify-between gap-4">
                    {/* Doctor Info */}
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-white shadow-md">
                        <Image
                          src={appointment?.doctorImage}
                          alt="doctor"
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-[#0c2f25]">
                          {appointment?.doctorName}
                        </h3>

                        <p className="text-sm text-[#6d8276]">
                          {appointment?.doctorSpecialization}
                        </p>
                      </div>
                    </div>

                    {/* Status */}
                    <div
                      className={`
                px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap ${
                  appointment?.appointmentStatus === "pending"
                    ? "bg-yellow-500/10 text-yellow-500"
                    : appointment?.appointmentStatus === "completed"
                      ? "bg-green-500/10 text-green-500"
                      : "bg-red-500/10 text-red-500"
                }`}
                    >
                      {appointment?.appointmentStatus.charAt(0).toUpperCase() +
                        appointment?.appointmentStatus.slice(1)}
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="flex items-center gap-6 mt-5 text-sm text-[#0c2f25]">
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-[#17a2b8]" />
                      {appointment?.appointmentDay}
                    </div>

                    <div className="flex items-center gap-2">
                      <FaClock className="text-[#17a2b8]" />
                      {appointment?.appointmentTime}
                    </div>
                  </div>

                  {/* Actions */}
                  {appointment?.appointmentStatus === "pending" ? (
                    <div className="mt-5 pt-4 border-t flex justify-between items-center">
                      <Link
                        href={`/dashboard/patient/my-appointments/${appointment?._id}`}
                      >
                        <Button className="px-0 h-auto bg-transparent color-secondary text-base">
                          Details
                        </Button>
                      </Link>

                      <div className="flex gap-4">
                        <RescheduleModal appointment={appointment} />

                        <DeleteAlertDialog
                          triggerBtnClass={
                            "px-0 h-auto bg-transparent text-base text-red-500 font-bold"
                          }
                          triggerBtnText={"Cancel"}
                          dialogHeading={"Cancel Appointment Permanently?"}
                          dialogDesBoldText={`${appointment?.doctorName} appointment`}
                          functionName={handleDelete}
                          functionParams={appointment?._id}
                          deleteCancelBtnText={"Back"}
                          deleteConfirmBtnText={"Cancel"}
                          loadingValue={loading}
                          loadingTimeText={"Canceling..."}
                        />
                      </div>
                    </div>
                  ) : appointment?.appointmentStatus === "completed" ? (
                    <div className="mt-5 pt-4 border-t">
                      <Link
                        href={`/dashboard/patient/my-appointments/view-prescription/${appointment?._id}`}
                      >
                        <Button className="w-full bg-primary rounded-md text-base">
                          View Prescription
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <p className="mt-5 pt-4 border-t text-center text-red-500">
                      Rejected By {appointment?.doctorName}
                    </p>
                  )}

                  {/* Hover Glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-linear-to-r from-[#17a2b8]/10 to-[#0b0b3b]/10 rounded-3xl pointer-events-none" />
                </div>
              </motion.div>
            ),
          )}
        </div>
      )}
    </>
  );
};

export default PatientAppointmentsContainer;
