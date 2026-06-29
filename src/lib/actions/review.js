import { revalidatePath } from "next/cache";
import { serverMutation } from "../server/server";

export const postReview = async (reviewData) => {
  const res = await serverMutation("/patient-review", reviewData, "POST");

  if (res?.insertedId) {
    revalidatePath("/dashboard/patient/my-appointments");
  }

  return res;
};
