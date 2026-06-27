"use client";

import DeleteAlertDialog from "@/components/shared/DeleteAlertDialog";
import { capitalizeFirstLetter } from "@/lib/helpers/capitalize-first-letter";
import { Button } from "@heroui/react";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";

const AppointmentCardOfAppointmentsRequestsPage = ({
  appointment,
  rejectAppointmentWrapper,
}) => {
  const [loading, setLoading] = useState(false);

  const handleAppointmentReject = async (appointmentId, patientName) => {
    try {
      setLoading(true);

      const res = await rejectAppointmentWrapper(appointmentId, {
        appointmentStatus: "rejected",
      });

      if (res?.modifiedCount > 0) {
        toast.success(`${patientName || "Patient"} appointment has rejected`);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something Went Wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="text-lg font-semibold color-tertiary">
          {appointment.patientName}
        </h3>

        <span
          className={`text-xs px-3 py-1 rounded-full font-medium ${
            appointment.appointmentStatus === "pending"
              ? "bg-yellow-100 text-yellow-600"
              : appointment.appointmentStatus === "completed"
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-500"
          }`}
        >
          {capitalizeFirstLetter(appointment.appointmentStatus)}
        </span>
      </div>

      {/* Body */}
      <div className="p-4 space-y-3">
        <p className="text-sm color-muted">
          📅 {appointment.appointmentDay} • {appointment.appointmentTime}
        </p>

        <p className="text-sm">
          <span className="font-medium color-tertiary">Symptoms: </span>
          <span className="color-muted">{appointment.symptoms || "N/A"}</span>
        </p>

        <div className="flex items-center justify-between mt-2">
          <span className="text-sm font-medium color-tertiary">Payment</span>

          <span
            className={`text-xs px-3 py-1 rounded-full font-medium ${
              appointment.paymentStatus === "paid"
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-500"
            }`}
          >
            {capitalizeFirstLetter(appointment.paymentStatus)}
          </span>
        </div>
      </div>

      {/* Footer Actions */}
      {appointment?.appointmentStatus === "pending" ? (
        <div className="flex gap-2 p-4 border-t">
          <DeleteAlertDialog
            triggerBtnClass={
              "w-full py-2 text-sm rounded-xl border border-red-200 text-red-500 bg-transparent hover:bg-red-50 transition"
            }
            triggerBtnText={"Reject"}
            dialogHeading={"Reject Appointment Permanently?"}
            dialogDesBoldText={`${appointment?.patientName} appointment`}
            functionName={handleAppointmentReject}
            functionParams={[appointment?._id, appointment?.patientName]}
            deleteCancelBtnText={"Back"}
            deleteConfirmBtnText={"Reject"}
            loadingValue={loading}
            loadingTimeText={"Rejecting..."}
          />

          <Link
            href={`/dashboard/doctor/appointment-requests/${appointment?._id}`}
            className="block w-full"
          >
            <Button className="w-full py-2 text-sm rounded-xl bg-primary text-white font-medium hover:opacity-90 transition">
              Accept
            </Button>
          </Link>
        </div>
      ) : appointment?.appointmentStatus === "completed" ? (
        <div className="p-4">
          <Link
            href={`/dashboard/doctor/view-prescription/${appointment?._id}`}
          >
            <Button className={"w-full rounded-md"}>View Prescription</Button>
          </Link>
        </div>
      ) : (
        <p className="p-4 text-center text-sm text-red-500 border-t">
          Appointment Rejected
        </p>
      )}
    </div>
  );
};

export default AppointmentCardOfAppointmentsRequestsPage;
