"use client";

import React from "react";
import { motion } from "framer-motion";

const PageTitle = ({ heading, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -180 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1,
        ease: "easeOut",
      }}
      className="mb-15"
    >
      <h2 className="mb-2 text-3xl md:text-4xl font-bold tracking-tight">
        {heading}
      </h2>

      <p className="max-w-xl text-muted-foreground text-sm md:text-base">
        {description}
      </p>
    </motion.div>
  );
};

export default PageTitle;
