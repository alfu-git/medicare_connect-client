"use client";

import React from "react";
import { motion } from "framer-motion";
import RegisterForm from "./RegisterForm";

const RegisterPageContent = () => {
  return (
    <section className="mt-20 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5">
        <div>
          {/* title */}
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.25, 1, 0.5, 1], // premium cubic-bezier feel
            }}
            viewport={{ once: false }}
          >
            <h2 className="mb-2 text-3xl font-bold">
              Create Your MediCare Account
            </h2>

            <p className="text-muted max-w-xl">
              Join MediCare Connect to manage your health records, book
              appointments, and access trusted healthcare services anytime.
            </p>
          </motion.div>

          {/* form */}
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.2,
              ease: [0.25, 1, 0.5, 1],
            }}
            viewport={{ once: false }}
          >
            <RegisterForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPageContent;
