import PatientMyReviewsHeading from "@/components/dashboardPage/patient/patientMyReviews/PatientMyReviewsHeading";
import PatientReviewsContainer from "@/components/dashboardPage/patient/patientMyReviews/PatientReviewsContainer";
import { deleteReview, updateReview } from "@/lib/actions/review";
import { getReviewsByPatientId } from "@/lib/api/review";
import { getUser, getUserFromDB } from "@/lib/helpers/get-user";
import React from "react";

export async function generateMetadata() {
  const patient = await getUser();

  return {
    title: `${patient?.name || "Patient"} Reviews | "MediCare Connect"}`,
    description: `Explore patient reviews and ratings for all doctors on MediCare Connect.`,
  };
}

const PatientReviewsPage = async () => {
  const patient = await getUserFromDB();
  const reviews = await getReviewsByPatientId(patient?._id);

  const updateReviewWrapper = async (reviewId, updatedReview) => {
    "use server";
    return await updateReview(reviewId, updatedReview);
  };

  const deleteReviewWrapper = async (reviewId) => {
    "use server";
    return await deleteReview(reviewId);
  };

  return (
    <section className="py-10 px-5 overflow-hidden">
      <div>
        <PatientMyReviewsHeading />
        <PatientReviewsContainer
          reviews={reviews}
          updateReviewWrapper={updateReviewWrapper}
          deleteReviewWrapper={deleteReviewWrapper}
        />
      </div>
    </section>
  );
};

export default PatientReviewsPage;
