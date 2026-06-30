"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@heroui/react";
import Link from "next/link";
import PatientReviewCard from "../PatientReviewCard";

const PatientReviewsContainer = ({
  reviews = [],
  updateReviewWrapper,
  deleteReviewWrapper,
}) => {
  // Empty State
  if (reviews.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-10 rounded-2xl shadow-lg"
        >
          <h2 className="text-2xl font-semibold mb-2 color-tertiary">
            No Reviews Yet 😔
          </h2>

          <p className="color-muted mb-6">
            Be the first one to share your experience
          </p>

          <Link href={"/dashboard/patient/my-appointments"}>
            <Button className="bg-primary text-white px-6 py-2 rounded-full hover:scale-105 transition-all duration-300">
              Give Review
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {reviews.map((review, index) => (
        <motion.div
          key={review._id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <PatientReviewCard
            review={review}
            updateReviewWrapper={updateReviewWrapper}
            deleteReviewWrapper={deleteReviewWrapper}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default PatientReviewsContainer;
