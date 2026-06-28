import { revalidatePath } from "next/cache";
import { serverMutation } from "../server/server";
import { redirect } from "next/navigation";

export const updatePatientProfile = async (patientId, updatedData) => {
  const res = await serverMutation(
    `/complete-patient-profile/${patientId}`,
    updatedData,
    "PATCH",
  );

  if (res?.modifiedCount > 0) {
    revalidatePath("/dashboard/patient");
  }

  return res;
};
