"use client";

import React, { useState } from "react";
import AppointmentCardOfAppointmentsRequestsPage from "./AppointmentCardOfAppointmentsRequestsPage";

const TABS = [
  { label: "Pending", value: "pending" },
  { label: "Completed", value: "completed" },
  { label: "Rejected", value: "rejected" },
];

const AppointmentsOfAppointmentRequestsPage = ({
  appointments = [],
  rejectAppointmentWrapper,
}) => {
  const [activeTab, setActiveTab] = useState("pending");

  const filteredAppointments = appointments.filter(
    (appointment) => appointment.appointmentStatus === activeTab,
  );

  return (
    <div>
      {/* 🔥 Premium Tabs */}
      <div className="flex flex-wrap justify-end gap-3 mb-8">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-500 border
              ${
                activeTab === tab.value
                  ? "bg-secondary text-white shadow-lg border-transparent"
                  : "bg-white text-gray-600 border-gray-200 hover:bg-gray-100"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 🔥 Empty State */}
      {filteredAppointments.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="text-6xl mb-4">📭</div>

          <h2 className="text-xl font-semibold text-gray-700">
            No {activeTab} appointments
          </h2>

          <p className="text-gray-500 mt-2">
            {activeTab === "pending" &&
              "You have no pending requests right now."}
            {activeTab === "accepted" &&
              "No appointments have been accepted yet."}
            {activeTab === "rejected" && "No rejected appointments found."}
          </p>
        </div>
      ) : (
        /* 🔥 Existing Grid (UNCHANGED) */
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredAppointments.map((appointment) => (
            <AppointmentCardOfAppointmentsRequestsPage
              key={appointment?._id}
              appointment={appointment}
              rejectAppointmentWrapper={rejectAppointmentWrapper}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AppointmentsOfAppointmentRequestsPage;
