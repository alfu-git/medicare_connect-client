"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import React from "react";
import { FiPlus } from "react-icons/fi";

const PatientDashboardLandingHeadingContainer = ({ user }) => {
  return (
    <div className="mb-10 flex flex-col sm:flex-row justify-between gap-3 overflow-hidden">
      <div className="animate__animated animate__fadeInLeft">
        <h2 className="text-2xl font-bold">Welcome back, {user?.name}</h2>

        <p className="color-muted">
          Here&apos;s what&apos;s happening with your health today.
        </p>
      </div>

      <Link
        href={"/find-doctors"}
        className="mt-1 animate__animated animate__fadeInRight"
      >
        <Button className={"bg-primary flex items-center rounded-xl"}>
          <FiPlus />
          <span className="text-base">New Appointment</span>
        </Button>
      </Link>
    </div>
  );
};

export default PatientDashboardLandingHeadingContainer;
