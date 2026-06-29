"use client";

import React from "react";

const AdminManageAppointmentsHeading = ({ totalAppointments }) => {
  return (
    <div className="mb-7.5 flex flex-col md:flex-row justify-between gap-3">
      <div className="animate__animated animate__fadeInLeft">
        <h2 className="text-2xl font-bold text-gray-800">
          Manage Appointments
        </h2>

        <p className="text-sm text-gray-500 mt-1 max-w-120">
          {" "}
          Here you can view, manage, and track all patient appointments
          efficiently.
        </p>
      </div>

      <p className="text-2xl font-bold color-primary animate__animated animate__fadeInRight">
        Total Appointments: {totalAppointments.length}
      </p>
    </div>
  );
};

export default AdminManageAppointmentsHeading;
