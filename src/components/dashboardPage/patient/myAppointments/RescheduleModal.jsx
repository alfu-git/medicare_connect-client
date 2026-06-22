"use client";

import React, { useEffect, useState } from "react";
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
import { updateAppointment } from "@/lib/actions/appointment";
import toast from "react-hot-toast";

const RescheduleModal = ({ appointment }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [appointmentDayValue, setAppointmentDayValue] = useState(
    appointment?.appointmentDay || "",
  );
  const [appointmentTimeValue, setAppointmentTimeValue] = useState(
    appointment?.appointmentTime || "",
  );
  const [symptomsValue, setSymptomsValue] = useState(
    appointment?.symptoms || "",
  );
  const [doctorData, setDoctorData] = useState(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      const res = await fetch(`/api/doctors/${appointment.doctorId}`);
      const data = await res.json();
      setDoctorData(data);
    };

    fetchDoctor();
  }, [appointment?.doctorId]);

  // ✅ UPDATED VALIDATION LOGIC
  const isDayChanged = appointmentDayValue !== appointment?.appointmentDay;

  const isTimeChanged = appointmentTimeValue !== appointment?.appointmentTime;

  const isSymptomsChanged = symptomsValue !== appointment?.symptoms;

  const isAnythingChanged = isDayChanged || isTimeChanged || isSymptomsChanged;

  const isSymptomsValid = !isSymptomsChanged || symptomsValue.length >= 20;

  const formIncomplete = !isAnythingChanged || !isSymptomsValid;

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (formIncomplete) {
      return;
    }

    const updatedAppointment = {
      appointmentDay: appointmentDayValue || appointment?.appointmentDay,
      appointmentTime: appointmentTimeValue || appointment?.appointmentTime,
      symptoms: symptomsValue || appointment?.symptoms,
    };

    try {
      setLoading(true);
      const res = await updateAppointment(appointment?._id, updatedAppointment);

      if (res?.modifiedCount > 0) {
        toast.success("Schedule Update Successful");
        setIsOpen(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={isOpen} onOpenChange={setIsOpen}>
      <Button className="px-0 h-auto bg-transparent text-[#17a2b8] font-semibold text-base">
        Reschedule
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

              {/* ✅ UPDATED ERROR MESSAGE */}
              {!isAnythingChanged && (
                <p className="text-red-500 text-center text-sm">
                  Update at least one information.
                </p>
              )}
            </Modal.Header>

            <Modal.Body className="p-6">
              <Surface variant="default">
                <form onSubmit={handleOnSubmit}>
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-3 items-center">
                      {/* appointment day */}
                      <Select
                        className="w-full"
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
                            {doctorData?.availableDays?.map((day, index) => (
                              <ListBox.Item
                                key={index}
                                id={day}
                                textValue={day}
                              >
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
                            {doctorData?.availableSlots?.map((slot, index) => (
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

                      {/* ✅ UPDATED SYMPTOMS VALIDATION */}
                      {isSymptomsChanged && symptomsValue.length < 20 && (
                        <p className="text-red-500 text-sm">
                          Minimum 20 Characters.
                        </p>
                      )}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mt-3 flex gap-2 justify-end">
                    <Button
                      type="button"
                      onClick={() => {
                        setAppointmentDayValue(
                          appointment?.appointmentDay || "",
                        );
                        setAppointmentTimeValue(
                          appointment?.appointmentTime || "",
                        );
                        setSymptomsValue(appointment?.symptoms || "");
                      }}
                      variant="secondary"
                    >
                      Clear
                    </Button>

                    <Button
                      type="submit"
                      isDisabled={formIncomplete || loading}
                    >
                      {loading ? "Submitting..." : "Submit"}
                    </Button>
                  </div>
                </form>
              </Surface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default RescheduleModal;
