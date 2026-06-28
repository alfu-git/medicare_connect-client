import { revalidatePath } from "next/cache";
import { serverMutation } from "../server/server";

export const postDoctorData = async (data) => {
  const res = await serverMutation("/doctors", data, "POST");

  if (res?.insertedId) {
    revalidatePath("/dashboard");
  }

  return res;
};

export const updateDoctorProfile = async (doctorId, updatedData) => {
  const res = await serverMutation(
    `/doctor-profile/${doctorId}`,
    updatedData,
    "PATCH",
  );

  if (res?.modifiedCount > 0) {
    revalidatePath("/dashboard/doctor/profile");
  }

  return res;
};
