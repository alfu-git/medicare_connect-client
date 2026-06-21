"use client";

import React, { useState } from "react";
import {
  Button,
  Label,
  Modal,
  Surface,
  Select,
  ListBox,
  TextArea,
} from "@heroui/react";
import { FaHandHoldingMedical } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";

const AppointmentModal = ({ doctor }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [appointmentDayValue, setAppointmentDayValue] = useState("");
  const [appointmentTimeValue, setAppointmentTimeValue] = useState("");
  const [symptomsValue, setSymptomsValue] = useState("");

  const formIncomplete =
    !appointmentDayValue ||
    !appointmentTimeValue ||
    !symptomsValue ||
    symptomsValue.length < 20;

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const appointmentData = {
      patientId: user?.id,
      doctorId: doctor?._id,
      appointmentDate: appointmentDayValue,
      appointmentTime: appointmentTimeValue,
      symptoms: symptomsValue,
      appointmentStatus: "pending",
      paymentStatus: "unpaid",
    };

    // 1. appointment save
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/appointments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
      },
    );
    const data = await res.json();
    const appointmentId = data?.appointmentId;
  };

  return (
    <Modal>
      <Button
        type="submit"
        disabled={doctor?.verificationStatus !== "verified"}
        className={`w-full py-6 text-lg bg-[#0b0b3b] hover:bg-primary rounded-xl transition-all duration-300`}
      >
        {doctor?.verificationStatus === "suspended"
          ? "Unavailable"
          : "Book Appointment"}
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-lg">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-[#0b0b3b]/20 color-secondary">
                <FaHandHoldingMedical className="size-5" />
              </Modal.Icon>

              <Modal.Heading className="text-xl font-semibold text-tertiary">
                Get Care
              </Modal.Heading>

              {formIncomplete && (
                <p className="text-red-500 text-center text-sm">
                  Please give all the details
                </p>
              )}
            </Modal.Header>

            <Modal.Body className="p-6">
              <Surface variant="default">
                <form onSubmit={handleOnSubmit} className="flex flex-col gap-4">
                  <div className="flex gap-3 items-center">
                    {/* appointment day */}
                    <Select
                      className="w-full"
                      placeholder="Day"
                      value={appointmentDayValue}
                      onChange={(value) => setAppointmentDayValue(value)}
                    >
                      <Label>Select Day</Label>
                      <Select.Trigger>
                        <Select.Value />
                        <Select.Indicator />
                      </Select.Trigger>

                      <Select.Popover>
                        <ListBox>
                          {doctor?.availableDays?.map((day, index) => (
                            <ListBox.Item key={index} id={day} textValue={day}>
                              {day}
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                          ))}
                        </ListBox>
                      </Select.Popover>
                    </Select>

                    {/* appointment time */}
                    <Select
                      className="w-full"
                      placeholder="Time"
                      value={appointmentTimeValue}
                      onChange={(value) => setAppointmentTimeValue(value)}
                    >
                      <Label>Select Time</Label>
                      <Select.Trigger>
                        <Select.Value />
                        <Select.Indicator />
                      </Select.Trigger>

                      <Select.Popover>
                        <ListBox>
                          {doctor?.availableSlots?.map((slot, index) => (
                            <ListBox.Item
                              key={index}
                              id={slot}
                              textValue={slot}
                            >
                              {slot}
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                          ))}
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  </div>

                  {/* symptoms */}
                  <div className="flex w-full flex-col gap-2">
                    <Label>Symptoms</Label>
                    <TextArea
                      aria-describedby="textarea-controlled-description"
                      aria-label="Announcement"
                      placeholder="Describe your problem..."
                      value={symptomsValue}
                      onChange={(event) => {
                        setSymptomsValue(event.target.value);
                      }}
                      rows={7}
                      className={"resize-none"}
                    />

                    {symptomsValue && symptomsValue.length < 20 && (
                      <p className="text-red-500 text-sm">
                        Minimum 20 Characters.
                      </p>
                    )}
                  </div>
                </form>

                <div className="mt-3 flex gap-2 justify-end">
                  <Button
                    onClick={() => {
                      setAppointmentDayValue("");
                      setAppointmentTimeValue("");
                      setSymptomsValue("");
                    }}
                    variant="secondary"
                  >
                    Clear
                  </Button>

                  <form action={"/api/payment"} method="POST">
                    <input
                      name="doctorName"
                      value={doctor?.doctorName}
                      type="hidden"
                    />
                    <input name="doctorId" value={doctor?._id} type="hidden" />
                    <input
                      name="consultationFee"
                      value={doctor?.consultationFee}
                      type="hidden"
                    />

                    <Button type="submit" isDisabled={formIncomplete}>
                      Booked
                    </Button>
                  </form>
                </div>
              </Surface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};
export default AppointmentModal;
