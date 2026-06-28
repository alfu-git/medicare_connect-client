"use client";

import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import React from "react";
import { BsArrowLeft } from "react-icons/bs";

const UpdatePrescriptionPageHeading = () => {
  const router = useRouter();

  return (
    <div className="mb-10 animate__animated animate__fadeInLeft">
      <Button
        onClick={() => router.back()}
        className="px-0 h-auto bg-transparent text-zinc-400 hover:text-[#0c2f25] text-xl font-semibold transition-colors duration-400"
      >
        <BsArrowLeft />
        <span>Back</span>
      </Button>
    </div>
  );
};

export default UpdatePrescriptionPageHeading;
