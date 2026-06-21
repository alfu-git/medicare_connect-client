"use client";

import React from "react";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import Link from "next/link";

const Banner = () => {
  return (
    <section className="text-white">
      <div className="max-w-7xl mx-auto px-5">
        <div
          className="relative px-5 sm:px-10 pt-30 md:pt-60 pb-10 md:pb-20 rounded-xl overflow-hidden flex items-center bg-cover bg-no-repeat"
          style={{ backgroundImage: "url('/images/banner-bg-2.jpg')" }}
        >
          {/* Overlay */}
          <div className="absolute bottom-0 left-0 w-full h-[70%] bg-linear-to-t from-[#0b0b3b]/95 via-[#0b0b3b]/80 to-transparent" />

          {/* Content */}
          <div className="relative z-10 max-w-4xl">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: false }}
              className="text-white! text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-6"
            >
              Advanced Medical Expertise You Can Trust
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              viewport={{ once: false }}
              className="max-w-2xl text-sm opacity-70 mb-8"
            >
              To improve the health and well-being of the communities we serve
              by delivering exceptional, personalized healthcare with
              compassion, innovation, and respect To be the trusted leader
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              viewport={{ once: false }}
            >
              <Link href={"/find-doctors"}>
                <Button
                  size="lg"
                  className="bg-primary text-white px-4 sm:px-8 py-3 sm:py-6 text-base sm:text-lg font-semibold rounded-xl shadow-lg hover:scale-105 duration-500 transition-all"
                >
                  Find Doctors
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
