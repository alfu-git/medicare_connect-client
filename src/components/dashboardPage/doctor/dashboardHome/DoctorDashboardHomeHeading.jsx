"use client";

import React from "react";

const DoctorDashboardHomeHeading = ({ doctor }) => {
  return (
    <div className="mb-10 animate__animated animate__fadeInLeft">
      <h2 className="text-2xl font-bold">Good to see you, {doctor?.name}</h2>

      <p className="color-muted">
        Here&apos;s an overview of your appointments, patients, and activities
        today.
      </p>
    </div>
  );
};

export default DoctorDashboardHomeHeading;
