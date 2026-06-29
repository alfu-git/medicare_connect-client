"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaUserMd, FaUser, FaMoneyBillWave, FaReceipt } from "react-icons/fa";

const PaymentManagementContent = ({ totalPayments }) => {
  // animation variants
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  // empty state
  if (!totalPayments || totalPayments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl p-10 shadow-lg"
        >
          <div className="text-6xl mb-4 text-[#17a2b8]">💳</div>
          <h2 className="text-2xl font-bold color-tertiary mb-2">
            No Payments Yet
          </h2>
          <p className="color-muted">
            Payments will appear here once patients complete transactions.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
    >
      {totalPayments.map((payment) => {
        const {
          _id,
          doctorName,
          patientId,
          consultationFee,
          paymentDate,
          transactionId,
        } = payment;

        return (
          <motion.div
            key={_id}
            variants={cardVariants}
            whileHover={{ y: -6, scale: 1.02 }}
            className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
          >
            {/* header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold color-secondary flex items-center gap-2">
                <FaReceipt className="text-[#17a2b8]" />
                Payment
              </h3>

              <span className="text-xs px-3 py-1 rounded-full bg-[#17a2b8]/10 text-[#17a2b8]">
                Paid
              </span>
            </div>

            {/* doctor */}
            <div className="flex items-center gap-3 mb-3">
              <FaUserMd className="text-[#17a2b8]" />
              <div>
                <p className="text-sm color-muted">Doctor</p>
                <p className="font-medium color-tertiary">{doctorName}</p>
              </div>
            </div>

            {/* patient */}
            <div className="flex items-center gap-3 mb-3">
              <FaUser className="text-[#17a2b8]" />
              <div>
                <p className="text-sm color-muted">Patient ID</p>
                <p className="font-medium color-tertiary">{patientId}</p>
              </div>
            </div>

            {/* amount */}
            <div className="flex items-center gap-3 mb-3">
              <FaMoneyBillWave className="text-[#17a2b8]" />
              <div>
                <p className="text-sm color-muted">Amount</p>
                <p className="font-semibold text-lg text-[#0b0b3b]">
                  ৳ {consultationFee}
                </p>
              </div>
            </div>

            {/* date */}
            <div className="mb-3">
              <p className="text-sm color-muted">Payment Date</p>
              <p className="text-sm color-tertiary">
                {new Date(paymentDate).toLocaleString()}
              </p>
            </div>

            {/* transaction */}
            <div className="bg-gray-50 p-3 rounded-lg text-xs text-gray-600 break-all">
              <span className="font-medium">Txn:</span> {transactionId}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default PaymentManagementContent;
