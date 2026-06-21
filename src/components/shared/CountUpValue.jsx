"use client";

import { motion, useMotionValue, animate } from "framer-motion";
import { useEffect, useState } from "react";

const CountUpValue = ({ value = 0, duration = 1, className = "" }) => {
  const motionValue = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration: duration,
      ease: "easeOut",
      onUpdate: (latest) => {
        setDisplay(Math.floor(latest));
      },
    });

    return () => controls.stop();
  }, [value, duration, motionValue]);

  return <span className={className}>{display}</span>;
};

export default CountUpValue;
