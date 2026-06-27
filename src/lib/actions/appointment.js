"use server";
import { revalidatePath } from "next/cache";
import { serverMutation } from "../server/server";

export const postAppointmentData = async (data) => {
  return await serverMutation("/appointments", data, "POST");
};

export const deleteAppointment = async (appointmentId) => {
  const res = await serverMutation(
    `/appointments/${appointmentId}`,
    {},
    "DELETE",
  );

  if (res?.deletedCount > 0) {
    revalidatePath("/dashboard/patient");
  }

  return res;
};

export const updateAppointment = async (appointmentId, updatedAppointment) => {
  const res = await serverMutation(
    `/appointments/${appointmentId}`,
    updatedAppointment,
    "PATCH",
  );

  if (res?.modifiedCount > 0) {
    revalidatePath("/dashboard/patient/my-appointments");
  }

  return res;
};

export const rejectAppointment = async (appointmentId, statusData) => {
  const res = await serverMutation(
    `/doctor-appointment/${appointmentId}`,
    statusData,
    "PATCH",
  );

  if (res?.modifiedCount > 0) {
    revalidatePath("/dashboard/doctor/appointment-requests");
  }

  return res;
};
