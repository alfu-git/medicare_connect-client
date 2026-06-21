"use client";

import ErrorPageContent from "@/components/errorPage/ErrorPageContent";
import React, { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="my-10 sm:my-0 min-h-screen flex items-center justify-center max-w-7xl mx-auto px-5">
      <ErrorPageContent reset={reset} />
    </section>
  );
}
