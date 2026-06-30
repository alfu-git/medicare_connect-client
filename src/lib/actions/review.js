import { revalidatePath } from "next/cache";
import { serverMutation } from "../server/server";

export const postReview = async (reviewData) => {
  const res = await serverMutation("/patient-review", reviewData, "POST");

  if (res?.insertedId) {
    revalidatePath("/dashboard/patient/my-appointments");
  }

  return res;
};

export const updateReview = async (reviewId, updatedReview) => {
  console.log(reviewId, updatedReview);
  const res = await serverMutation(
    `/patient-review/${reviewId}`,
    updatedReview,
    "PATCH",
  );

  if (res?.modifiedCount > 0) {
    revalidatePath("/dashboard/patient/my-reviews");
  }

  return res;
};

export const deleteReview = async (reviewId) => {
  const res = await serverMutation(`/patient-review/${reviewId}`, {}, "DELETE");

  if (res?.deletedCount > 0) {
    revalidatePath("/dashboard/patient/my-reviews");
  }

  return res;
};
