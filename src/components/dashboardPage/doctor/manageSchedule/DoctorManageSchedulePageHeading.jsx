"use client";

import React from "react";

const DoctorManageSchedulePageHeading = ({ doctor }) => {
  return (
    <div className="mb-10 animate__animated animate__fadeInLeft">
      <h2 className="text-2xl font-bold">
        Manage Your Schedule, {doctor?.doctorName}
      </h2>

      <p className="color-muted">
        Set your availability, organize appointment slots, and stay in control
        of your daily schedule.
      </p>
    </div>
  );
};

export default DoctorManageSchedulePageHeading;
