"use client";

import React from "react";

const DoctorProfilePageHeading = ({ doctor }) => {
  return (
    <div className="mb-6 animate__animated animate__fadeInLeft">
      <h2 className="text-2xl font-bold">{doctor?.doctorName} Profile</h2>

      <p className="color-muted">
        {" "}
        View and manage your professional details, qualifications, and medical
        information.
      </p>
    </div>
  );
};

export default DoctorProfilePageHeading;
