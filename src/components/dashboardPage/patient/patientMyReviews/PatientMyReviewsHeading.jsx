"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import React from "react";
import { FaPlus } from "react-icons/fa6";

const PatientMyReviewsHeading = () => {
  return (
    <div className="mb-15 flex flex-col md:flex-row justify-between gap-4">
      <div className="animate__animated animate__fadeInLeft">
        <h2 className="text-2xl font-bold">My Reviews</h2>

        <p className="color-muted max-w-120">
          Here you can see all the reviews you’ve shared about doctors and your
          healthcare experience.
        </p>
      </div>

      <Link
        href={"/dashboard/patient/my-appointments"}
        className="block animate__animated animate__fadeInRight"
      >
        <Button
          className={
            "px-3 bg-linear-to-r from-[#17a2b8] via-[#0b0b3b] to-[#0c2f25] rounded-md"
          }
        >
          <FaPlus />
          <span>Give More Review</span>
        </Button>
      </Link>
    </div>
  );
};

export default PatientMyReviewsHeading;
