import { Button } from "@heroui/react";
import Image from "next/image";
import React from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { IoLocationOutline } from "react-icons/io5";
import { LuUser } from "react-icons/lu";
import { MdOutlineDateRange } from "react-icons/md";
import PatientProfileUpdateModal from "./PatientProfileUpdateModal";

const PatientProfileMainSec = ({ user }) => {
  return (
    <div className="w-full bg-white/70 backdrop-blur-xl border border-white/40 shadow-xl rounded-3xl p-6 flex flex-col-reverse md:flex-row justify-between gap-4 hover:shadow-2xl transition-all duration-300">
      {/* LEFT SECTION */}
      <div className="flex flex-col gap-6 sm:items-center md:flex-row">
        {/* IMAGE */}
        <div className="relative group max-w-fit">
          <div className="absolute inset-0 bg-linear-to-tr from-[#17a2b8] via-[#0b0b3b] to-[#0c2f25] rounded-[30px] blur-md opacity-40 group-hover:opacity-70 transition" />

          <figure className="relative p-0.75 rounded-[30px] bg-white">
            <Image
              src={user?.image}
              alt={user?.name}
              width={180}
              height={180}
              className="rounded-[25px] object-cover"
            />
          </figure>
        </div>

        {/* INFO */}
        <div className="space-y-3">
          {/* NAME */}
          <h3 className="text-2xl font-bold tracking-wide text-[#0c2f25]">
            {user?.name}
          </h3>

          {/* ID */}
          <div className="flex items-center gap-2 text-sm text-[#6d8276]">
            <LuUser className="text-[#17a2b8]" />
            <p className="font-medium">
              PATIENT ID:
              <span className="ml-1 color-primary font-bold">{user?.id}</span>
            </p>
          </div>

          {/* META INFO */}
          <div className="flex flex-col gap-1 text-sm text-[#6d8276]">
            <div className="flex items-center gap-2">
              <MdOutlineDateRange className="text-[#17a2b8]" />
              <span>
                Member since{" "}
                <span className="font-medium">
                  {new Date(user?.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </span>
            </div>

            {user?.location && (
              <div className="flex items-center gap-2">
                <IoLocationOutline className="text-[#17a2b8]" />
                <span className="text-[#0b0b3b] font-medium">
                  {user?.location}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT CTA */}
      <div className="max-w-fit ml-auto">
        <PatientProfileUpdateModal user={user} />
      </div>
    </div>
  );
};

export default PatientProfileMainSec;
