"use client";

import { motion } from "framer-motion";
import { FaFileMedical, FaCalendarTimes } from "react-icons/fa";

const EmptyStateOfDoctorPrescriptionManagement = ({
  type = "appointment", // "appointment" | "prescription"
}) => {
  const isAppointment = type === "appointment";

  return (
    <div className="flex items-center justify-center py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative max-w-md w-full text-center p-8 rounded-3xl backdrop-blur-xl bg-white/60 border border-gray-200 shadow-xl"
      >
        {/* Floating Glow Effect */}
        <div className="absolute inset-0 rounded-3xl bg-linear-to-r from-secondary/20 via-purple-200/20 to-blue-200/20 blur-2xl opacity-60"></div>

        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
          className="relative z-10 flex justify-center mb-5"
        >
          <div className="p-5 rounded-full bg-linear-to-r from-secondary to-purple-500 color-primary text-3xl shadow-lg">
            {isAppointment ? <FaCalendarTimes /> : <FaFileMedical />}
          </div>
        </motion.div>

        {/* Title */}
        <h2 className="relative z-10 text-xl font-semibold text-gray-800 mb-2">
          {isAppointment ? "No Pending Appointments" : "No Prescriptions Found"}
        </h2>

        {/* Description */}
        <p className="relative z-10 text-gray-500 text-sm leading-relaxed">
          {isAppointment
            ? "You're all caught up! No patients are waiting for prescriptions right now."
            : "You haven't created any prescriptions yet. They will appear here once completed."}
        </p>

        {/* Subtle animation dots */}
        <motion.div
          className="flex justify-center gap-2 mt-6"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          {[1, 2, 3].map((dot) => (
            <motion.span
              key={dot}
              variants={{
                hidden: { opacity: 0.3, y: 0 },
                visible: {
                  opacity: 1,
                  y: [0, -6, 0],
                },
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
              }}
              className="w-2 h-2 bg-secondary rounded-full"
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default EmptyStateOfDoctorPrescriptionManagement;
