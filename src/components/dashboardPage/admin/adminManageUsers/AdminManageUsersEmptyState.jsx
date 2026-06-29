"use client";

import { motion } from "framer-motion";
import { HiOutlineUserGroup } from "react-icons/hi";
import React from "react";

const AdminManageUsersEmptyState = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-10 text-center">
      {/* Animated Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-linear-to-tr from-[#17a2b8]/20 to-blue-500/20 p-6 rounded-full mb-2"
      >
        <HiOutlineUserGroup className="text-5xl text-[#17a2b8]" />
      </motion.div>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-semibold text-gray-700"
      >
        No Users Found
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-gray-500 mt-2 max-w-md"
      >
        There are no users available right now.
      </motion.p>
    </div>
  );
};

export default AdminManageUsersEmptyState;
