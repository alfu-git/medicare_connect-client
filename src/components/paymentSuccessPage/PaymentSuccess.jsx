"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaRegCheckCircle } from "react-icons/fa";

export default function PaymentSuccess({ customerEmail }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#17a2b8]/5 via-white to-[#17a2b8]/10 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8 md:p-12 max-w-xl w-full text-center border border-green-100"
      >
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-[#17a2b8]/10 p-5 rounded-full shadow-inner">
            <FaRegCheckCircle className="color-primary w-10 h-10" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold color-secondary mb-3">
          Payment Successful 🎉
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 text-lg mb-6">
          Thank you! Your payment has been processed successfully.
        </p>

        {/* Email */}
        <div className="bg-[#17a2b8]/5  border border-green-100 rounded-xl p-4 mb-6">
          <p className="text-sm text-gray-500">Confirmation sent to</p>
          <p className="color-primary font-semibold break-all">
            {customerEmail}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col justify-center">
          <Link href="/">
            <button className="w-full md:w-auto px-6 py-3 rounded-xl bg-[#17a2b8] text-white font-medium hover:bg-[#17a2b8]/90 transition shadow-md">
              Go Home
            </button>
          </Link>
        </div>

        {/* Footer */}
        <p className="text-sm text-gray-400 mt-6">
          Need help? Contact{" "}
          <Link
            href="mailto:medicare@gmail.com"
            className="color-primary hover:underline"
          >
            medicare@gmail.com
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
