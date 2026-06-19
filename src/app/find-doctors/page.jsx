import DoctorsCardContainer from "@/components/findDoctorsPage/DoctorsCardContainer";
import SearchAndSortField from "@/components/findDoctorsPage/SearchAndSortField";
import { getAllDoctors } from "@/lib/api/doctor";
import React from "react";

export const metadata = {
  title: "Find Doctors | MediCare Connect",
  description:
    "Search and connect with verified doctors across various specialties. Book appointments easily with MediCare Connect and get the best healthcare support anytime, anywhere.",
};

const FindDoctorsPage = async ({ searchParams }) => {
  const filters = await searchParams;

  const searchQuery = new URLSearchParams(filters);
  const searchQueryString = searchQuery.toString();

  const doctors = await getAllDoctors(searchQueryString);

  return (
    <section className="my-20">
      <div className="max-w-7xl mx-auto px-5">
        <div>
          {/* title */}
          <div className="mb-15">
            <h2 className="mb-1 text-3xl font-bold">
              Expert Care, Just a Click Away
            </h2>

            <p className="max-w-xl color-muted">
              Access top medical professionals and get quality care whenever you
              need it.
            </p>
          </div>

          {/* search and sort */}
          <div className="mb-7.5">
            <SearchAndSortField filters={filters} />
          </div>

          {/* content */}
          <div>
            <DoctorsCardContainer doctors={doctors} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FindDoctorsPage;
