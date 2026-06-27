"use client";

import React from "react";

const DoctorAppointmentRequestsPageHeading = ({ doctor }) => {
  return (
    <div className="mb-10 animate__animated animate__fadeInLeft">
      <h2 className="text-2xl font-bold">
        Appointment Requests, {doctor?.doctorName}
      </h2>

      <p className="color-muted max-w-120">
        Review incoming appointment requests from patients, and accept, reject,
        or reschedule them based on your availability.
      </p>
    </div>
  );
};

export default DoctorAppointmentRequestsPageHeading;
