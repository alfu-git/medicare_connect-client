"use client";

import { Button, Table } from "@heroui/react";
import React, { useState } from "react";
import PaymentHistoryAppointmentTable from "./PaymentHistoryAppointmentTable";

const PaymentHistoryMainContent = ({ payments, appointments }) => {
  const [activeTab, setActiveTab] = useState("appointments");

  return (
    <div className="mt-10">
      {/* tab btn */}
      <div className="mb-7.5 flex justify-center">
        <div className="p-1 bg-white rounded-full shadow-md flex items-center gap-1">
          <Button
            onClick={() => setActiveTab("appointments")}
            className={`px-3 transition-all duration-500 ${activeTab === "appointments" ? "bg-linear-to-r from-[#17a2b8] via-[#0b0b3b] to-[#0c2f25]" : "px-0 bg-transparent color-tertiary"}`}
          >
            Paid Appointments
          </Button>

          <Button
            onClick={() => setActiveTab("transaction")}
            className={`px-3 transition-all duration-500 ${activeTab === "transaction" ? "bg-linear-to-r from-[#17a2b8] via-[#0b0b3b] to-[#0c2f25]" : "px-3 bg-transparent color-tertiary"}`}
          >
            Transactions Records
          </Button>
        </div>
      </div>

      {/* table */}
      {activeTab === "appointments" &&
        appointments?.map((appointment) => (
          <PaymentHistoryAppointmentTable
            key={appointment?._id}
            appointment={appointment}
          />
        ))}

      {activeTab === "transaction" && (
        <Table className="bg-transparent rounded-sm animate__animated animate__backInUp">
          <Table.ScrollContainer>
            <Table.Content
              aria-label="Team members"
              className="w-full rounded-sm"
            >
              <Table.Header className={"bg-[#17a2b8]/10"}>
                <Table.Column isRowHeader className={"text-center"}>
                  #
                </Table.Column>
                <Table.Column isRowHeader className={"text-center"}>
                  TRANSACTION ID
                </Table.Column>
                <Table.Column isRowHeader className={"text-center"}>
                  DOCTOR
                </Table.Column>
                <Table.Column className={"text-center"}>
                  DATE & TIME
                </Table.Column>
                <Table.Column className={"text-center"}>
                  AMOUNT (<strong className="text-xl">৳</strong>)
                </Table.Column>
              </Table.Header>

              <Table.Body>
                {payments.map((payment, index) => (
                  <Table.Row key={payment?._id}>
                    <Table.Cell className={"rounded-t-none rounded-bl-sm"}>
                      <span className="block max-w-fit mx-auto">
                        {index + 1}
                      </span>
                    </Table.Cell>

                    <Table.Cell>
                      <p className="max-w-fit mx-auto color-primary font-bold text-center">
                        {payment?.transactionId}
                      </p>
                    </Table.Cell>

                    <Table.Cell>
                      <div className="max-w-fit mx-auto text-center">
                        <p className="">{payment?.doctorName}</p>
                      </div>
                    </Table.Cell>

                    <Table.Cell>
                      <p className="max-w-fit mx-auto text-center">
                        {new Date(payment?.paymentDate).toLocaleString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          },
                        )}
                      </p>
                    </Table.Cell>

                    <Table.Cell className={"rounded-t-none rounded-br-sm"}>
                      <p className="max-w-fit mx-auto">
                        {payment?.consultationFee}
                      </p>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      )}
    </div>
  );
};

export default PaymentHistoryMainContent;
