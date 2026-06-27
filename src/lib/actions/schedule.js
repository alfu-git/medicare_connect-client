import { revalidatePath } from "next/cache";
import { serverMutation } from "../server/server";

export const addNewSchedule = async (doctorId, data) => {
  const res = await serverMutation(`/schedule/${doctorId}`, data, "PATCH");

  if (res?.modifiedCount > 0) {
    revalidatePath("/dashboard/doctor/manage-schedule");
  }

  return res;
};

export const deleteSchedule = async (doctorId, data) => {
  const res = await serverMutation(`/schedule/${doctorId}`, data, "DELETE");

  if (res?.modifiedCount > 0) {
    revalidatePath("/dashboard/doctor/manage-schedule");
  }

  return res;
};
