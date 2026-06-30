"use client";

import React, { useState } from "react";
import Image from "next/image";
import Rating from "@/components/shared/Rating";
import { relativeTimeFormat } from "@/lib/helpers/relative-time-format";
import DeleteAlertDialog from "@/components/shared/DeleteAlertDialog";
import toast from "react-hot-toast";
import ReviewUpdateModal from "./patientMyReviews/ReviewUpdateModal";

const PatientReviewCard = ({
  review,
  updateReviewWrapper,
  deleteReviewWrapper,
}) => {
  const [loadingReviewId, setLoadingReviewId] = useState(null);

  const handleReviewDelete = async (reviewId, doctorName) => {
    try {
      setLoadingReviewId(reviewId);

      const res = await deleteReviewWrapper(reviewId);

      if (res?.deletedCount > 0) {
        toast.success(`Review for ${doctorName} deleted successfully`);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something Went Wrong!");
    } finally {
      setLoadingReviewId(null);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-4 flex flex-col justify-between">
      {/* Top Section */}
      <div>
        {/* Doctor Info */}
        <div className="flex justify-between">
          <div className="flex items-center gap-4 mb-4">
            <Image
              src={review.doctorImage}
              alt={review.doctorName}
              width={60}
              height={60}
              className="w-15 h-15 rounded-xl object-cover"
            />

            <div>
              <h3 className="font-semibold color-tertiary">
                {review.doctorName}
              </h3>

              <Rating value={review.rating} size={14} />
            </div>
          </div>

          <p className="text-sm text-zinc-500 font-medium">
            {relativeTimeFormat(
              review.updatedAt ? review.updatedAt : review.createdAt,
            )}
          </p>
        </div>

        {/* Review Text */}
        <p className="color-muted text-sm leading-relaxed">
          &quot;{review.review}&quot;
        </p>
      </div>

      {/* Bottom Buttons */}
      <div className="flex justify-between mt-6">
        <ReviewUpdateModal
          review={review}
          updateReviewWrapper={updateReviewWrapper}
        />

        <DeleteAlertDialog
          triggerBtnClass={
            "px-4 py-1.5 text-sm rounded-md border border-red-400 text-red-400 bg-transparent hover:bg-red-400 hover:text-white transition-all duration-300"
          }
          triggerBtnText={"Delete"}
          dialogHeading={`Delete Review Permanently?`}
          dialogDesBoldText={`${review?.doctorName} review`}
          functionName={handleReviewDelete}
          functionParams={[review?._id, review?.doctorName]}
          deleteCancelBtnText={"Back"}
          deleteConfirmBtnText={"Delete"}
          loadingValue={loadingReviewId === review?._id}
          loadingTimeText={"Deleting..."}
        />
      </div>
    </div>
  );
};

export default PatientReviewCard;
