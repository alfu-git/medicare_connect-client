"use client";

import { Button } from "@heroui/react";
import Image from "next/image";
import { IoArrowRedoSharp } from "react-icons/io5";
import { motion } from "framer-motion";
import Link from "next/link";

export default function DoctorsCardContainer({ doctors }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {doctors.map((doctor, index) => (
        <motion.div
          key={index}
          className="p-3 bg-white rounded-3xl shadow-xl group"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            delay: index * 0.1,
          }}
          viewport={{ once: false }}
        >
          <figure>
            <Image
              src={doctor?.profileImage}
              alt={doctor?.doctorName}
              width={200}
              height={300}
              className="w-full h-80 rounded-xl"
            />
          </figure>

          <div className="mt-3">
            <div className="p-5 bg-[#F6F6F6] group-hover:bg-[#0b0b3b] transition-color duration-500 rounded-xl flex justify-between">
              <div className="flex flex-col">
                <h3 className="mb-1 group-hover:text-white! transition-color duration-500 text-xl font-bold">
                  {doctor?.doctorName}
                </h3>
                <span className="font-semibold color-muted">
                  {doctor?.specialization}
                </span>
                <span className="color-muted">{doctor?.qualifications}</span>
              </div>

              <Link href={`/find-doctors/${doctor?._id}`}>
                <Button className="w-12 h-12 bg-white shadow rounded-full color-primary">
                  <IoArrowRedoSharp className="w-7 h-7" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
