"use client";

import React, { useState } from "react";
import AppointmentCardOfDoctorPrescriptionManagementPage from "./AppointmentCardOfDoctorPrescriptionManagementPage";
import { Button } from "@heroui/react";
import PrescriptionCardOfDoctorPrescriptionManagement from "./PrescriptionCardOfDoctorPrescriptionManagement";
import EmptyStateOfDoctorPrescriptionManagement from "./EmptyStateOfDoctorPrescriptionManagement";

const DoctorPrescriptionManagementMainSec = ({
  appointments = [],
  prescriptions = [],
}) => {
  const [activeTab, setActiveTab] = useState("create");

  const pendingAppointments = appointments.filter(
    (appointment) => appointment.appointmentStatus === "pending",
  );

  return (
    <div>
      <div className="flex flex-wrap justify-end gap-3 mb-8">
        <Button
          onClick={() => setActiveTab("create")}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-500 border ${activeTab === "create" ? "bg-secondary text-white shadow-lg border-transparent" : "bg-white text-gray-600 border-gray-200 hover:bg-gray-100"}`}
        >
          Create Prescriptions
        </Button>

        <Button
          onClick={() => setActiveTab("completed")}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-500 border ${activeTab === "completed" ? "bg-secondary text-white shadow-lg border-transparent" : "bg-white text-gray-600 border-gray-200 hover:bg-gray-100"}`}
        >
          Completed Prescriptions
        </Button>
      </div>

      <div>
        {activeTab === "create" ? (
          pendingAppointments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center">
              {pendingAppointments.map((appointment) => (
                <AppointmentCardOfDoctorPrescriptionManagementPage
                  key={appointment?._id}
                  appointment={appointment}
                />
              ))}
            </div>
          ) : (
            <EmptyStateOfDoctorPrescriptionManagement type="appointment" />
          )
        ) : prescriptions.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
            {prescriptions.map((prescription) => (
              <PrescriptionCardOfDoctorPrescriptionManagement
                key={prescription?._id}
                prescription={prescription}
              />
            ))}
          </div>
        ) : (
          <EmptyStateOfDoctorPrescriptionManagement type="prescription" />
        )}
      </div>
    </div>
  );
};

export default DoctorPrescriptionManagementMainSec;
