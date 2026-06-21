"use server";
import { revalidatePath } from "next/cache";
import { serverMutation } from "../server/server";

export const postAppointmentData = async (data) => {
  return await serverMutation("/appointments", data, "POST");
};

export const deleteUpcomingAppointment = async (appointmentId) => {
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
