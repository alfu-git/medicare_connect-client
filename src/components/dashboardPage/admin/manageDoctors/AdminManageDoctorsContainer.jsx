"use client";

import React, { useState } from "react";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import Image from "next/image";
import toast from "react-hot-toast";

const TABS = ["unverified", "verified", "rejected"];

const AdminManageDoctorsContainer = ({
  totalDoctors,
  updateDoctorStatusWrapper,
}) => {
  const [loadingDoctorId, setLoadingDoctorId] = useState(null);
  const [loadingAction, setLoadingAction] = useState(null); // ✅ NEW
  const [activeTab, setActiveTab] = useState("unverified");

  const filteredDoctors = totalDoctors?.filter(
    (doc) => doc.verificationStatus === activeTab,
  );

  const handleUpdateDoctorStatus = async (
    doctorId,
    doctorName,
    updatedStatus,
  ) => {
    try {
      setLoadingDoctorId(doctorId);
      setLoadingAction(updatedStatus); // ✅ NEW

      const res = await updateDoctorStatusWrapper(doctorId, {
        verificationStatus: updatedStatus,
      });

      if (res?.modifiedCount > 0) {
        toast.success(`${doctorName} is ${updatedStatus}`);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something Went Wrong!");
    } finally {
      setLoadingDoctorId(null);
      setLoadingAction(null); // ✅ NEW
    }
  };

  return (
    <div className="p-4">
      {/* 🔥 Tabs */}
      <div className="flex justify-end gap-2 mb-6">
        {TABS.map((tab) => (
          <Button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`capitalize px-4 py-2 rounded-lg transition-all duration-300 ${
              activeTab === tab
                ? "bg-secondary text-white"
                : "bg-white text-gray-600 border"
            }`}
          >
            {tab}
          </Button>
        ))}
      </div>

      {/* 🔥 Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredDoctors?.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <motion.div
              key={doctor._id}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-2xl shadow-md p-4 hover:shadow-xl transition-all"
            >
              {/* 🔹 Top */}
              <div className="flex items-center gap-4">
                <Image
                  src={doctor.profileImage}
                  alt={doctor.doctorName}
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-full object-cover border"
                />
                <div>
                  <h3 className="font-semibold text-lg text-secondary">
                    {doctor.doctorName}
                  </h3>

                  <p className="text-sm color-muted">{doctor.specialization}</p>
                </div>
              </div>

              {/* 🔹 Info */}
              <div className="mt-4 space-y-1 text-sm color-muted">
                <p>🏥 {doctor.hospitalName}</p>
                <p>🎓 {doctor.qualifications}</p>
                <p>⏳ {doctor.experience}</p>
                <p>💰 {doctor.consultationFee}৳</p>
              </div>

              {/* 🔹 Availability */}
              <div className="mt-3">
                <p className="text-xs font-medium mb-1 text-gray-500">
                  Available Days:
                </p>

                <div className="flex flex-wrap gap-1">
                  {doctor.availableDays.map((day, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 bg-gray-100 rounded"
                    >
                      {day}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-2">
                <p className="text-xs font-medium mb-1 text-gray-500">Slots:</p>
                <div className="flex flex-wrap gap-1">
                  {doctor.availableSlots.map((slot, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 bg-gray-100 rounded"
                    >
                      {slot}
                    </span>
                  ))}
                </div>
              </div>

              {/* 🔥 Actions */}
              <div className="mt-4 flex gap-2">
                {doctor.verificationStatus === "unverified" && (
                  <>
                    <Button
                      size="sm"
                      className="w-full rounded-md bg-green-500 text-white"
                      onClick={() =>
                        handleUpdateDoctorStatus(
                          doctor._id,
                          doctor?.doctorName,
                          "verified",
                        )
                      }
                      isDisabled={loadingDoctorId === doctor?._id}
                    >
                      {loadingDoctorId === doctor?._id &&
                      loadingAction === "verified"
                        ? "Verifying..."
                        : "Verify"}
                    </Button>

                    <Button
                      size="sm"
                      className="w-full rounded-md bg-red-500 text-white"
                      onClick={() =>
                        handleUpdateDoctorStatus(
                          doctor._id,
                          doctor?.doctorName,
                          "rejected",
                        )
                      }
                      isDisabled={loadingDoctorId === doctor?._id}
                    >
                      {loadingDoctorId === doctor?._id &&
                      loadingAction === "rejected"
                        ? "Rejecting..."
                        : "Reject"}
                    </Button>
                  </>
                )}

                {doctor.verificationStatus === "verified" && (
                  <>
                    <Button
                      size="sm"
                      className="w-full rounded-md bg-yellow-500 text-white"
                      onClick={() =>
                        handleUpdateDoctorStatus(
                          doctor._id,
                          doctor?.doctorName,
                          "unverified",
                        )
                      }
                      isDisabled={loadingDoctorId === doctor?._id}
                    >
                      {loadingDoctorId === doctor?._id &&
                      loadingAction === "unverified"
                        ? "Please Wait..."
                        : "Unverified"}
                    </Button>

                    <Button
                      size="sm"
                      className="w-full rounded-md bg-red-500 text-white"
                      onClick={() =>
                        handleUpdateDoctorStatus(
                          doctor._id,
                          doctor?.doctorName,
                          "rejected",
                        )
                      }
                      isDisabled={loadingDoctorId === doctor?._id}
                    >
                      {loadingDoctorId === doctor?._id &&
                      loadingAction === "rejected"
                        ? "Rejecting..."
                        : "Reject"}
                    </Button>
                  </>
                )}

                {doctor.verificationStatus === "rejected" && (
                  <span className="text-xs px-3 py-1 bg-red-100 text-red-600 rounded-full">
                    Rejected
                  </span>
                )}
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-12 flex justify-center items-center py-20">
            <p className="text-gray-400 text-center">No doctors found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminManageDoctorsContainer;
