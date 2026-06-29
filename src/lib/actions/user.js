import { revalidatePath } from "next/cache";
import { serverMutation } from "../server/server";

export const updateUserStatus = async (userId, updatedStatus) => {
  const res = await serverMutation(
    `/update-user-status/${userId}`,
    updatedStatus,
    "PATCH",
  );

  if (res?.modifiedCount > 0) {
    revalidatePath("/dashboard/doctor/manage-users");
  }

  return res;
};

export const deleteUser = async (userId) => {
  const res = await serverMutation(`/delete-user/${userId}`, {}, "DELETE");

  if (res?.deletedCount > 0) {
    revalidatePath("/dashboard/doctor/manage-users");
  }

  return res;
};
