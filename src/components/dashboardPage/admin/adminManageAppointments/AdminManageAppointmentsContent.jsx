"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { capitalizeFirstLetter } from "@/lib/helpers/capitalize-first-letter";

const tabs = ["pending", "completed", "rejected"];

const AdminManageAppointmentsContent = ({ totalAppointments = [] }) => {
  const [activeTab, setActiveTab] = useState("pending");

  // filter data
  const filteredAppointments = totalAppointments.filter(
    (item) => item.appointmentStatus === activeTab,
  );

  return (
    <div className="mt-6">
      {/* 🔘 TAB BUTTONS */}
      <div className="flex justify-end gap-3 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 
              ${
                activeTab === tab
                  ? "bg-secondary text-white shadow-md scale-105"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* 📦 CONTENT */}
      {filteredAppointments.length === 0 ? (
        <motion.div
          key="empty"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          className="flex flex-col items-center justify-center py-20 bg-white rounded-xl shadow-sm"
        >
          <h3 className="text-lg font-semibold color-tertiary mb-2">
            No {activeTab} appointments
          </h3>

          <p className="text-sm color-muted">
            {activeTab === "pending" &&
              "All appointments are handled. No pending requests."}
            {activeTab === "completed" && "No completed appointments yet."}
            {activeTab === "rejected" && "No rejected appointments found."}
          </p>
        </motion.div>
      ) : (
        <motion.div
          key="list"
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
        >
          {filteredAppointments.map((item) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              whileHover={{ scale: 0.5 }}
              className="bg-white rounded-xl p-5 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              {/* 👨‍⚕️ Doctor Info */}
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src={item.doctorImage}
                  alt={item.doctorName}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-sm text-gray-800">
                    {item.doctorName}
                  </h4>

                  <p className="text-xs color-muted">
                    {item.doctorSpecialization}
                  </p>
                </div>
              </div>

              {/* 👤 Patient Info */}
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src={item.patientImage}
                  alt={item.patientName}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-sm font-medium text-gray-700">
                    {item.patientName}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {item.patientAge} yrs • {item.patientGender}
                  </p>
                </div>
              </div>

              {/* 📅 Appointment Info */}
              <div className="text-sm text-gray-600 space-y-1 mb-3">
                <p>
                  <span className="font-medium">Day:</span>{" "}
                  {item.appointmentDay}
                </p>
                <p>
                  <span className="font-medium">Time:</span>{" "}
                  {item.appointmentTime}
                </p>
              </div>

              {/* 💊 Symptoms */}
              <div className="bg-gray-50 p-3 rounded-md text-xs text-gray-600 mb-3 line-clamp-3">
                {item.symptoms}
              </div>

              {/* 📞 Contact */}
              <p className="text-xs text-gray-500 mb-2">
                📞 {item.patientNumber}
              </p>

              {/* 💳 Payment */}
              <div className="flex justify-between items-center mt-3">
                <span
                  className={`text-xs px-3 py-1 rounded-full 
                      ${
                        item.paymentStatus === "paid"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                >
                  {capitalizeFirstLetter(item.paymentStatus)}
                </span>

                <span
                  className={`text-xs px-3 py-1 rounded-full capitalize
                      ${
                        item.appointmentStatus === "pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : item.appointmentStatus === "completed"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                      }`}
                >
                  {item.appointmentStatus}
                </span>
              </div>

              {/* 🕒 Created */}
              <p className="text-[10px] text-gray-400 mt-3">
                Created: {new Date(item.createdAt).toLocaleString()}
              </p>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default AdminManageAppointmentsContent;
