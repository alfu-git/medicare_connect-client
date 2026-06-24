"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Lock, ArrowRight } from "lucide-react";

const ProfileInCompleteState = ({ description, modal }) => {
  return (
    <div className="min-h-screen z-40 flex items-center justify-center backdrop-blur-md rounded-3xl">
      {/* Animated Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white shadow-2xl rounded-3xl p-8 max-w-md w-full text-center border border-gray-200"
      >
        {/* Icon */}
        <motion.div
          initial={{ rotate: -10 }}
          animate={{ rotate: 10 }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 1.5,
          }}
          className="flex justify-center mb-4"
        >
          <div className="bg-primary/10 p-4 rounded-full">
            <Lock className="text-primary w-10 h-10" />
          </div>
        </motion.div>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-2 color-tertiary">
          Complete Your Profile
        </h2>

        {/* Description */}
        <p className="text-sm color-muted mb-6">{description}</p>

        {/* Button */}
        {modal}

        {/* Progress hint */}
        <p className="text-xs mt-4 text-gray-400">
          Takes less than 2 minutes ⏱️
        </p>
      </motion.div>
    </div>
  );
};

export default ProfileInCompleteState;
