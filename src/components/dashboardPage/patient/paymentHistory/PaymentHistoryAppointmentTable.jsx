"use client";

import React, { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";
import Image from "next/image";
import { Table } from "@heroui/react";

const PaymentHistoryAppointmentTable = ({ appointment }) => {
  const [doctorData, setDoctorData] = useState(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      const res = await fetch(`/api/doctors/${appointment?.doctorId}`);
      const data = await res.json();
      setDoctorData(data);
    };

    fetchDoctor();
  }, [appointment?.doctorId]);

  return (
    <Table className="bg-transparent rounded-sm animate__animated animate__backInUp">
      <Table.ScrollContainer>
        <Table.Content aria-label="Team members" className="w-full rounded-sm">
          <Table.Header className={"bg-[#17a2b8]/10"}>
            <Table.Column isRowHeader className={"text-center"}>
              DOCTOR
            </Table.Column>
            <Table.Column className={"text-center"}>
              SPECIALIZATION
            </Table.Column>
            <Table.Column className={"text-center"}>DAY & TIME</Table.Column>
            <Table.Column className={"text-center"}>
              AMOUNT (<strong className="text-xl">৳</strong>)
            </Table.Column>
            <Table.Column className={"text-center"}>STATUS</Table.Column>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell className={"rounded-t-none rounded-bl-sm"}>
                <div className=" max-w-fit mx-auto flex flex-col md:flex-row gap-2 items-center text-center md:text-left">
                  <figure className="border border-[#17a2b8] rounded-full">
                    <Image
                      src={appointment?.doctorImage}
                      alt={appointment?.doctorName}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  </figure>

                  <h4>{appointment?.doctorName}</h4>
                </div>
              </Table.Cell>

              <Table.Cell>
                <p className="max-w-fit mx-auto">
                  {appointment?.doctorSpecialization}
                </p>
              </Table.Cell>

              <Table.Cell>
                <p className="max-w-fit mx-auto text-center">
                  {appointment?.appointmentDay}, {appointment?.appointmentTime}
                </p>
              </Table.Cell>

              <Table.Cell>
                <p className="max-w-fit mx-auto">
                  {doctorData?.consultationFee}
                </p>
              </Table.Cell>

              <Table.Cell>
                <div className="max-w-fit mx-auto px-2 py-0.5 flex gap-0.5 items-center bg-yellow-500/20 text-yellow-500 border border-yellow-500/30 rounded-full">
                  <GoDotFill className="w-3 h-3" />

                  <span>
                    {appointment?.appointmentStatus?.charAt(0).toUpperCase() +
                      appointment?.appointmentStatus?.slice(1)}
                  </span>
                </div>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
};

export default PaymentHistoryAppointmentTable;
