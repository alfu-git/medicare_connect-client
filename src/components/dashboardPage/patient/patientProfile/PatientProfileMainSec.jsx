import Image from "next/image";
import React from "react";
import { IoLocationOutline } from "react-icons/io5";
import { LuUser } from "react-icons/lu";
import { MdOutlineDateRange } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import PatientProfileUpdateModal from "./PatientProfileUpdateModal";

const PatientProfileMainSec = ({ user, updatePatientProfileWrapper }) => {
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
          {/* NAME & BADGES */}
          <div className="space-y-2">
            <h3 className="text-2xl font-bold tracking-wide text-[#0c2f25]">
              {user?.name}
            </h3>

            {/* Age & Gender Premium Badges */}
            <div className="flex flex-wrap gap-2">
              {user?.gender && (
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-[#17a2b8]/10 text-[#17a2b8] border border-[#17a2b8]/20">
                  {user?.gender}
                </span>
              )}
              {user?.age && (
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-[#0c2f25]/10 text-[#0c2f25] border border-[#0c2f25]/20">
                  {user?.age} Years Old
                </span>
              )}
            </div>
          </div>

          {/* ID */}
          <div className="flex items-center gap-2 text-sm text-[#6d8276]">
            <LuUser className="text-[#17a2b8]" />
            <p className="font-medium">
              PATIENT ID:
              <span className="ml-1 color-primary font-bold">
                {user?.id || user?._id}
              </span>
            </p>
          </div>

          {/* META INFO */}
          <div className="flex flex-col gap-1.5 text-sm text-[#6d8276]">
            {/* Phone Number */}
            {user?.number && (
              <div className="flex items-center gap-2">
                <FiPhone className="text-[#17a2b8]" />
                <span className="font-medium text-[#0b0b3b]">
                  {user?.number}
                </span>
              </div>
            )}

            {/* Registration Date */}
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

            {/* Location */}
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
        <PatientProfileUpdateModal
          user={user}
          updatePatientProfileWrapper={updatePatientProfileWrapper}
        />
      </div>
    </div>
  );
};

export default PatientProfileMainSec;
