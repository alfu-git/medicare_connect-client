import DoctorsCardContainer from "@/components/findDoctorsPage/DoctorsCardContainer";
import DoctorsEmptyState from "@/components/findDoctorsPage/DoctorsEmptyState";
import SearchAndSortField from "@/components/findDoctorsPage/SearchAndSortField";
import PageTitle from "@/components/shared/PageTitle";
import { getAllDoctors } from "@/lib/api/doctor";
import { Pagination } from "@heroui/react";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Find Doctors | MediCare Connect",
  description:
    "Search and connect with verified doctors across various specialties. Book appointments easily with MediCare Connect and get the best healthcare support anytime, anywhere.",
};

const FindDoctorsPage = async ({ searchParams }) => {
  const params = await searchParams;
  const searchValue = params?.search || "";
  const sortValue = params?.sortBy || "";

  const hasParams = Object.keys(params || {}).length > 0;

  const {
    data: doctors,
    page,
    totalPage,
    totalData,
  } = await getAllDoctors(params.page, searchValue, sortValue);

  const pages = [];

  for (let i = 1; i <= totalPage; i++) {
    pages.push(i);
  }

  return (
    <section className="my-20">
      <div className="max-w-7xl mx-auto px-5">
        <div>
          {/* title */}
          <PageTitle
            heading={"Expert Care, Just a Click Away"}
            description={
              "Access top medical professionals and get quality care whenever you need it."
            }
          />

          {/* search and sort */}
          <div className="mb-7.5 overflow-hidden">
            <SearchAndSortField params={params} />
          </div>

          {/* content */}
          <div>
            {doctors?.length === 0 ? (
              hasParams ? (
                <DoctorsEmptyState type="noResults" />
              ) : (
                <DoctorsEmptyState type="noData" />
              )
            ) : (
              <div>
                <DoctorsCardContainer doctors={doctors} />

                {/* pagination */}
                <div className="mt-10 max-w-fit ml-auto">
                  <Pagination size="lg">
                    {/* <Pagination.Summary>
                    {start} to {end} of {totalData} results
                  </Pagination.Summary> */}
                    <Pagination.Content>
                      <Pagination.Item>
                        <Pagination.Previous isDisabled={page === 1}>
                          <Link
                            href={`/find-doctors?page=${page - 1}`}
                            className="flex gap-1 items-center"
                          >
                            <Pagination.PreviousIcon />
                            Prev
                          </Link>
                        </Pagination.Previous>
                      </Pagination.Item>

                      {pages.map((p) => (
                        <Pagination.Item key={p}>
                          <Link href={`/find-doctors?page=${p}`}>
                            <Pagination.Link
                              className={
                                p === page && "bg-secondary text-white"
                              }
                              isActive={p === page}
                            >
                              {p}
                            </Pagination.Link>
                          </Link>
                        </Pagination.Item>
                      ))}

                      <Pagination.Item>
                        <Pagination.Next isDisabled={page === pages.length}>
                          <Link
                            href={`/find-doctors?page=${page + 1}`}
                            className="flex gap-1 items-center"
                          >
                            Next
                            <Pagination.NextIcon />
                          </Link>
                        </Pagination.Next>
                      </Pagination.Item>
                    </Pagination.Content>
                  </Pagination>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FindDoctorsPage;
