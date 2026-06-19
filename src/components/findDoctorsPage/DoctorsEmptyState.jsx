"use client";

import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import { FaUserMd, FaSearch } from "react-icons/fa";

const DoctorsEmptyState = ({ type = "noData" }) => {
  const isSearch = type === "noResults";

  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1,
        ease: [0.25, 1, 0.5, 1],
      }}
      viewport={{ once: false }}
      className="flex flex-col items-center justify-center text-center py-20"
    >
      {/* icon */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="mb-6 p-6 rounded-full bg-linear-to-br from-blue-100 to-blue-50 text-blue-600 text-4xl shadow-inner"
      >
        {isSearch ? <FaSearch /> : <FaUserMd />}
      </motion.div>

      {/* title */}
      <h3 className="text-2xl font-semibold mb-2">
        {isSearch ? "No doctors found" : "No doctors available"}
      </h3>

      {/* description */}
      <p className="max-w-md text-muted-foreground mb-6">
        {isSearch
          ? "We couldn’t find any doctors matching your search. Try adjusting filters or keywords."
          : "There are currently no doctors available on the platform. Please check back later."}
      </p>

      {/* subtle CTA */}
      {isSearch ? (
        <button
          onClick={() => (window.location.href = "/find-doctors")}
          className="px-5 py-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Clear Search
        </button>
      ) : (
        <Button
          onClick={() => (window.location.href = "/")}
          className="px-5 py-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Return Home
        </Button>
      )}
    </motion.div>
  );
};

export default DoctorsEmptyState;
