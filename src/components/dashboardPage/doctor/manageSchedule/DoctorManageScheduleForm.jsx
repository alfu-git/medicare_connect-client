"use client";

import DeleteAlertDialog from "@/components/shared/DeleteAlertDialog";
import { Form, Select, Button, ListBox } from "@heroui/react";
import React, { useState } from "react";
import toast from "react-hot-toast";

const days = [
  {
    id: "Sunday",
    textValue: "Sunday",
    value: "Sunday",
  },
  {
    id: "Monday",
    textValue: "Monday",
    value: "Monday",
  },
  {
    id: "Tuesday",
    textValue: "Tuesday",
    value: "Tuesday",
  },
  {
    id: "Wednesday",
    textValue: "Wednesday",
    value: "Wednesday",
  },
  {
    id: "Thursday",
    textValue: "Thursday",
    value: "Thursday",
  },
  {
    id: "Friday",
    textValue: "Friday",
    value: "Friday",
  },
  {
    id: "Saturday",
    textValue: "Saturday",
    value: "Saturday",
  },
];

const timeSlots = [
  { id: "09:00 AM", value: "09:00 AM" },
  { id: "10:00 AM", value: "10:00 AM" },
  { id: "11:00 AM", value: "11:00 AM" },
  { id: "12:00 PM", value: "12:00 PM" },
  { id: "02:00 PM", value: "02:00 PM" },
  { id: "03:00 PM", value: "03:00 PM" },
  { id: "04:00 PM", value: "04:00 PM" },
  { id: "05:00 PM", value: "05:00 PM" },
];

const DoctorManageScheduleForm = ({
  doctor,
  addNewScheduleWrapper,
  deleteScheduleWrapper,
}) => {
  const [addedAvailableDaysValue, setAddedAvailableDaysValue] = useState([]);
  const [addedAvailableSlotsValue, setAddedAvailableSlotsValue] = useState([]);
  const [deletedAvailableDaysValue, setDeletedAvailableDaysValue] = useState(
    [],
  );
  const [deletedAvailableSlotsValue, setDeletedAvailableSlotsValue] = useState(
    [],
  );
  const [loading, setLoading] = useState(false);

  const hasAdded =
    addedAvailableDaysValue.length > 0 || addedAvailableSlotsValue.length > 0;

  const hasDeleted =
    deletedAvailableDaysValue.length > 0 ||
    deletedAvailableSlotsValue.length > 0;

  const handleAdded = async (e) => {
    e.preventDefault();

    const newSchedule = {
      availableDays: addedAvailableDaysValue,
      availableSlots: addedAvailableSlotsValue,
    };

    try {
      setLoading(true);

      const res = await addNewScheduleWrapper(newSchedule);

      if (res?.modifiedCount > 0) {
        toast.success("Schedule Update Done");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something Went Wrong!");
    } finally {
      setLoading(false);
      setAddedAvailableDaysValue([]);
      setAddedAvailableSlotsValue([]);
    }
  };

  const handleDeleted = async () => {
    const deletedSchedule = {
      deletedScheduleDays: deletedAvailableDaysValue,
      deletedScheduleSlots: deletedAvailableSlotsValue,
    };

    try {
      setLoading(true);

      const res = await deleteScheduleWrapper(deletedSchedule);

      if (res?.modifiedCount > 0) {
        toast.success(`Schedule Delete Successful`);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something Went Wrong!");
    } finally {
      setLoading(false);
      setDeletedAvailableDaysValue([]);
      setDeletedAvailableSlotsValue([]);
    }
  };

  return (
    <div
      className={`pt-5 sm:pt-10 pb-10 sm:pb-20 bg-white rounded-2xl shadow-[0_0_20px_#17a2b8] animate__animated animate__zoomInDown`}
    >
      {/* added sec */}
      <div className="px-5 sm:px-10 pb-10 border-b-2 border-[#F6F6F6]">
        <h4 className="mb-2 text-base color-tertiary font-semibold">
          Added New Schedule
        </h4>

        <Form onSubmit={handleAdded} className="md:grid md:grid-cols-12">
          {/* days + slots */}
          <div
            className={`flex flex-col sm:flex-row gap-4 items-center ${hasAdded ? "col-span-8" : "col-span-12"}`}
          >
            <Select
              className="w-full"
              placeholder="Select days"
              selectionMode="multiple"
              value={addedAvailableDaysValue}
              onChange={(value) => setAddedAvailableDaysValue(value)}
            >
              <Select.Trigger>
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>

              <Select.Popover>
                <ListBox selectionMode="multiple">
                  {days.map((day, index) => (
                    <ListBox.Item
                      key={index}
                      id={day.id}
                      textValue={day.textValue}
                    >
                      {day.value}
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>

            <Select
              className="w-full"
              placeholder="Select time"
              selectionMode="multiple"
              value={addedAvailableSlotsValue}
              onChange={(value) => setAddedAvailableSlotsValue(value)}
            >
              <Select.Trigger>
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>

              <Select.Popover>
                <ListBox selectionMode="multiple">
                  {timeSlots.map((time, index) => (
                    <ListBox.Item
                      key={index}
                      id={time.id}
                      textValue={time.value}
                    >
                      {time.value}
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>
          </div>

          {/* CTA */}
          {hasAdded && (
            <div className="mt-3 md:mt-0 md:col-span-4 flex gap-4 justify-end items-center">
              <Button
                onClick={() => {
                  setAddedAvailableDaysValue([]);
                  setAddedAvailableSlotsValue([]);
                }}
                variant="secondary"
                className={"rounded-md"}
              >
                Clear
              </Button>

              <Button
                isDisabled={loading}
                type="submit"
                className={"bg-[#0b0b3b] hover:bg-[#0b0b3b]/90 rounded-md"}
              >
                {loading ? "Please Wait..." : "Add"}
              </Button>
            </div>
          )}
        </Form>
      </div>

      {/* deleted sec */}
      <div className="px-5 sm:px-10 pt-5">
        <h4 className="mb-2 text-base color-tertiary font-semibold">
          Delete Schedule
        </h4>

        <div className="md:grid md:grid-cols-12">
          {/* days + slots */}
          <div
            className={`flex flex-col sm:flex-row gap-4 items-center ${hasDeleted ? "col-span-8" : "col-span-12"}`}
          >
            <Select
              className="w-full"
              placeholder={doctor?.availableDays[0] || "Select days"}
              selectionMode="multiple"
              value={deletedAvailableDaysValue}
              onChange={(value) => setDeletedAvailableDaysValue(value)}
            >
              <Select.Trigger>
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>

              <Select.Popover>
                <ListBox selectionMode="multiple">
                  {doctor?.availableDays.map((day) => (
                    <ListBox.Item key={day} id={day} textValue={day}>
                      {day}
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>

            <Select
              className="w-full"
              placeholder={doctor?.availableSlots[0] || "Select time"}
              selectionMode="multiple"
              value={deletedAvailableSlotsValue}
              onChange={(value) => setDeletedAvailableSlotsValue(value)}
            >
              <Select.Trigger>
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>

              <Select.Popover>
                <ListBox selectionMode="multiple">
                  {doctor?.availableSlots.map((slot) => (
                    <ListBox.Item key={slot} id={slot} textValue={slot}>
                      {slot}
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>
          </div>

          {/* CTA */}
          {hasDeleted && (
            <div className="mt-3 md:mt-0  md:col-span-4 flex gap-4 justify-end items-center">
              <Button
                onClick={() => {
                  setDeletedAvailableDaysValue([]);
                  setDeletedAvailableSlotsValue([]);
                }}
                variant="secondary"
                className={"rounded-md"}
              >
                Clear
              </Button>

              <DeleteAlertDialog
                triggerBtnClass={
                  "bg-red-500 hover:bg-red-500/90 active:bg-red-600 rounded-md font-semibold"
                }
                triggerBtnText={"Delete"}
                dialogHeading={"Delete Schedule Permanently?"}
                dialogDesBoldText={`your schedule`}
                functionName={handleDeleted}
                deleteCancelBtnText={"Back"}
                deleteConfirmBtnText={"Delete"}
                loadingValue={loading}
                loadingTimeText={"Deleting..."}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorManageScheduleForm;
