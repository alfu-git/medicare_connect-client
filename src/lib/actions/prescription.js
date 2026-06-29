import { revalidatePath } from "next/cache";
import { serverMutation } from "../server/server";

export const postPrescription = async (data) => {
  const res = await serverMutation("/doctor-prescriptions", data, "POST");

  if (res?.insertedId) {
    revalidatePath("/dashboard/doctor/prescription-management");
  }

  return res;
};

export const updatePrescription = async (prescriptionId, updatedData) => {
  const res = await serverMutation(
    `/update-doctor-prescription/${prescriptionId}`,
    updatedData,
    "PATCH",
  );

  if (res?.modifiedCount > 0) {
    revalidatePath("/dashboard/doctor/prescription-management");
  }

  return res;
};
