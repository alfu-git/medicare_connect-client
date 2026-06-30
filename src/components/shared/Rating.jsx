"use client";

import React from "react";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

const Rating = ({ value = 0, size = 18, showValue = true }) => {
  // function to render stars
  const renderStar = (index) => {
    if (value >= index + 1) {
      return <FaStar key={index} />;
    } else if (value >= index + 0.5) {
      return <FaStarHalfAlt key={index} />;
    } else {
      return <FaRegStar key={index} />;
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* Stars */}
      <div className="flex items-center text-yellow-400">
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            style={{ fontSize: size }}
            className="transition-all duration-200 hover:scale-110"
          >
            {renderStar(index)}
          </span>
        ))}
      </div>

      {/* Rating Value */}
      {showValue && (
        <span className="text-sm font-semibold text-gray-700">
          {value.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default Rating;
