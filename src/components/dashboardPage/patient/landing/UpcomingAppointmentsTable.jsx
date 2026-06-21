"use client";

import DeleteAlertDialog from "@/components/shared/DeleteAlertDialog";
import { deleteUpcomingAppointment } from "@/lib/actions/appointment";
import { Table } from "@heroui/react";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { GoDotFill } from "react-icons/go";

const UpcomingAppointmentsTable = ({ upcomingAppointments }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async (appointmentId) => {
    try {
      setLoading(true);
      const res = await deleteUpcomingAppointment(appointmentId);

      if (res?.deletedCount > 0) {
        toast.success("Appointment Cancel Successful");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Table className="bg-transparent rounded-sm">
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
            <Table.Column className={"text-center"}>STATUS</Table.Column>
            <Table.Column className={"text-center"}>ACTIONS</Table.Column>
          </Table.Header>

          <Table.Body>
            {upcomingAppointments.map((appointment) => (
              <Table.Row key={appointment?._id}>
                <Table.Cell className={"rounded-t-none rounded-bl-sm"}>
                  <div className=" max-w-fit mx-auto flex gap-2 items-center ">
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
                  <p className="max-w-fit mx-auto">
                    {appointment?.appointmentDay},{" "}
                    {appointment?.appointmentTime}
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

                {/* reusable delete alert dialog */}
                <Table.Cell className={"rounded-t-none rounded-br-sm"}>
                  <DeleteAlertDialog
                    triggerBtnClass={
                      "max-w-fit mx-auto px-0 h-auto bg-transparent text-red-500 font-bold"
                    }
                    triggerBtnText={"Cancel Appointment"}
                    dialogHeading={"Cancel Appointment Permanently?"}
                    dialogDesBoldText={`${appointment?.doctorName} appointment`}
                    functionName={handleDelete}
                    functionParams={appointment?._id}
                    deleteCancelBtnText={"Back"}
                    deleteConfirmBtnText={"Cancel"}
                    loadingValue={loading}
                    loadingTimeText={"Canceling..."}
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
};

export default UpcomingAppointmentsTable;
