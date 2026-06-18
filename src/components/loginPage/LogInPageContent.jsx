"use client";

import React from "react";
import { motion } from "framer-motion";
import LogInForm from "./LogInForm";

const LogInPageContent = () => {
  return (
    <section className="mt-20 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5">
        <div>
          {/* title */}
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 1.4,
              ease: [0.25, 1, 0.5, 1],
            }}
            viewport={{ once: true }}
          >
            <h2 className="mb-2 text-3xl font-bold">
              Welcome Back to MediCare Connect
            </h2>

            <p className="text-muted max-w-xl">
              Log in to continue your healthcare journey with easy access to
              doctors, appointments, and records.
            </p>
          </motion.div>

          {/* form */}
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 1.4,
              delay: 0.2,
              ease: [0.25, 1, 0.5, 1],
            }}
            viewport={{ once: true }}
          >
            <LogInForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LogInPageContent;
