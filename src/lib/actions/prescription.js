import { revalidatePath } from "next/cache";
import { serverMutation } from "../server/server";

export const postPrescription = async (data) => {
  const res = await serverMutation("/doctor-prescriptions", data, "POST");

  if (res?.insertedId) {
    revalidatePath("/dashboard/doctor/appointment-requests");
    revalidatePath("/dashboard/doctor/prescription-management");
  }

  return res;
};
