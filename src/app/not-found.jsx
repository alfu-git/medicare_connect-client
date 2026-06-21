import NotFoundPageContent from "@/components/notFoundPage/NotFoundPageContent";
import React from "react";

export const metadata = {
  title: "404 - Page Not Found | MediCare Connect",
  description:
    "Oops! The page you're looking for isn't available. Return to MediCare Connect to book appointments, manage health records, and access healthcare services.",
};

const NotFoundPage = () => {
  return (
    <section className="my-10 md:my-0 min-h-screen flex items-center justify-center bg-[#F6F6F6] max-w-7xl mx-auto px-5">
      <NotFoundPageContent />
    </section>
  );
};

export default NotFoundPage;
