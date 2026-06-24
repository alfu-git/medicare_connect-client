import { revalidatePath } from "next/cache";
import { serverMutation } from "../server/server";

export const postDoctorData = async (data) => {
  const res = await serverMutation("/doctors", data, "POST");

  if (res?.insertedId) {
    revalidatePath("/dashboard");
  }
  
  return res;
};
