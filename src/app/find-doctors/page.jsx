import DoctorCard from "@/components/findDoctorsPage/DoctorCard";
import { getAllDoctors } from "@/lib/api/data";
import React from "react";

export const metadata = {
  title: "Find Doctors | MediCare Connect",
  description:
    "Search and connect with verified doctors across various specialties. Book appointments easily with MediCare Connect and get the best healthcare support anytime, anywhere.",
};

const FindDoctorsPage = async () => {
  const doctors = await getAllDoctors();

  return (
    <section className="my-20">
      <div className="max-w-7xl mx-auto px-5">
        <div>
          {/* title */}
          <div className="mb-10">
            <h2 className="mb-1 text-3xl font-bold">
              Expert Care, Just a Click Away
            </h2>
            
            <p className="max-w-xl color-muted">
              Access top medical professionals and get quality care whenever you
              need it.
            </p>
          </div>

          {/* content */}
          <div>
            <DoctorCard doctors={doctors} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FindDoctorsPage;
