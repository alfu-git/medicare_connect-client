import React from "react";
import { DNA } from "react-loader-spinner";

const DNALoader = ({ height, width }) => {
  return (
    <DNA
      visible={true}
      height={height}
      width={width}
      ariaLabel="dna-loading"
      dnaColorOne="#17a2b8"
      dnaColorTwo="#0b0b3b"
      wrapperClass="dna-wrapper"
    />
  );
};

export default DNALoader;
