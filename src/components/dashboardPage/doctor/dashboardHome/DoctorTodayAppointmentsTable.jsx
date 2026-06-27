"use client";

import { Button, Table } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsArrowRight } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";

const DoctorTodayAppointmentsTable = ({ todayAppointments = [] }) => {
  const today = new Date();

  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="mt-12">
      <div className="mb-7.5 animate__animated animate__fadeInLeft">
        <h2 className="text-xl font-bold">Today&apos;s Appointments</h2>

        <p className="color-muted">{formattedDate}</p>
      </div>

      <Table className="bg-transparent rounded-sm">
        <Table.ScrollContainer>
          <Table.Content
            aria-label="Team members"
            className="w-full rounded-sm"
          >
            <Table.Header className={"bg-[#17a2b8]/10"}>
              <Table.Column isRowHeader className={"text-center"}>
                PATIENT
              </Table.Column>
              <Table.Column className={"text-center"}>
                APPOINTMENT TIME
              </Table.Column>
              <Table.Column className={"text-center"}>STATUS</Table.Column>
              <Table.Column className={"text-center"}>ACTIONS</Table.Column>
            </Table.Header>

            <Table.Body>
              {todayAppointments.slice(0, 5).map((appointment) => (
                <Table.Row key={appointment?._id}>
                  <Table.Cell className={"rounded-t-none rounded-bl-sm"}>
                    <div className=" max-w-fit mx-auto flex flex-col md:flex-row gap-2 items-center text-center md:text-left">
                      <figure className="border border-[#17a2b8] rounded-full">
                        <Image
                          src={appointment?.patientImage}
                          alt={appointment?.patientName}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                      </figure>

                      <h4>{appointment?.patientName}</h4>
                    </div>
                  </Table.Cell>

                  <Table.Cell>
                    <p className="max-w-fit mx-auto">
                      {appointment?.appointmentTime}
                    </p>
                  </Table.Cell>

                  <Table.Cell>
                    <div className="max-w-fit mx-auto px-2 py-0.5 flex gap-0.5 items-center bg-yellow-500/20 text-yellow-500 border border-yellow-500/30 rounded-full">
                      <GoDotFill className="w-3 h-3" />

                      <span>
                        {appointment?.appointmentStatus
                          ?.charAt(0)
                          .toUpperCase() +
                          appointment?.appointmentStatus?.slice(1)}
                      </span>
                    </div>
                  </Table.Cell>

                  <Table.Cell className={"rounded-t-none rounded-br-sm"}>
                    <div className="max-w-fit mx-auto">
                      <Link
                        href={`/dashboard/doctor/appointment-details/${appointment?._id}`}
                      >
                        <Button
                          className={
                            "px-0 h-auto bg-transparent text-base font-medium color-primary"
                          }
                        >
                          Details
                        </Button>
                      </Link>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>

      {todayAppointments.length > 5 && (
        <div className="mt-4 flex justify-end">
          <Link href={"/dashboard/doctor/all-today-appointments"}>
            <Button
              className={
                "px-0 h-auto bg-transparent color-muted flex items-center"
              }
            >
              <span>View All</span>
              <BsArrowRight className="mt-1 text-lg" />
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default DoctorTodayAppointmentsTable;
