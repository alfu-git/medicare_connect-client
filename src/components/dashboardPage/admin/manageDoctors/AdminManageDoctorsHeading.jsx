"use client";

import React from "react";

const AdminManageDoctorsHeading = ({ totalDoctors }) => {
  return (
    <div className="mb-7.5 flex flex-col md:flex-row justify-between gap-3">
      <div className="animate__animated animate__fadeInLeft">
        <h2 className="text-2xl font-bold text-gray-800">Manage Doctors</h2>

        <p className="text-sm text-gray-500 mt-1 max-w-120">
          View, update, and manage all registered doctors in the system.
        </p>
      </div>

      <p className="text-2xl font-bold color-primary animate__animated animate__fadeInRight">
        Total Doctors: {totalDoctors.length}
      </p>
    </div>
  );
};

export default AdminManageDoctorsHeading;
