"use client";

import {
  Button,
  Form,
  Label,
  Modal,
  Surface,
  TextArea,
  useOverlayState,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa";

const GiveReviewModal = ({ appointment, postReviewWrapper }) => {
  const [reviewValue, setReviewValue] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [loading, setLoading] = useState(false);
  const state = useOverlayState();
  const router = useRouter();

  // ✅ validation check
  const formInComplete =
    !reviewValue || reviewValue.length < 20 || rating === 0;

  // ✅ submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formInComplete) {
      return;
    }

    try {
      setLoading(true);

      const payload = {
        patientId: appointment?.patientId,
        doctorId: appointment?.doctorId,
        appointmentId: appointment?._id,
        review: reviewValue,
        rating,
      };

      const res = await postReviewWrapper(payload);

      if (res?.insertedId) {
        toast.success("Review submitted successfully");
        state.close();
        setReviewValue("");
        setRating(0);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal state={state}>
      <Button
        onPress={state.open}
        className="w-full bg-fuchsia-600 text-white px-6 py-3 rounded-md font-semibold flex items-center gap-2 mx-auto shadow-md hover:shadow-lg transition"
      >
        Give Review
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog
            className={`sm:max-w-2xl ${
              formInComplete ? "border-2 border-red-500" : ""
            }`}
          >
            <Modal.CloseTrigger />

            <Modal.Heading>
              {formInComplete && (
                <p className="text-red-500 text-sm text-center">
                  Please fill all the field
                </p>
              )}
            </Modal.Heading>

            <Modal.Body className="p-6">
              <Surface variant="default">
                <Form className="space-y-6" onSubmit={handleSubmit}>
                  {/* review */}
                  <div className="flex w-full flex-col gap-2">
                    <Label className="text-base mb-3">Review</Label>

                    {/* ⭐ STAR RATING */}
                    <div className="mb-2 flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Button
                          key={star}
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHover(star)}
                          onMouseLeave={() => setHover(null)}
                          className="px-0 h-auto bg-transparent cursor-pointer transition"
                        >
                          <FaStar
                            className={`w-7 h-7 ${
                              (hover || rating) >= star
                                ? "text-yellow-400"
                                : "text-gray-400"
                            }`}
                          />
                        </Button>
                      ))}
                    </div>

                    <TextArea
                      placeholder="Describe your precious thought..."
                      value={reviewValue}
                      onChange={(event) => {
                        setReviewValue(event.target.value);
                      }}
                      rows={5}
                      className={"resize-none"}
                    />

                    {reviewValue && reviewValue.length < 20 && (
                      <p className="text-red-500 text-sm">
                        Minimum 20 Characters.
                      </p>
                    )}
                  </div>

                  {/* CTA */}
                  <Modal.Footer>
                    <Button
                      slot="close"
                      variant="secondary"
                      className={"rounded-md"}
                    >
                      Cancel
                    </Button>

                    <Button
                      isDisabled={formInComplete || loading}
                      type="submit"
                      className={
                        "bg-[#17a2b8] hover:bg-[#17a2b8]/80 active:bg-[#17a2b8]/90 rounded-md"
                      }
                    >
                      {loading ? "Please Wait..." : "Submit"}
                    </Button>
                  </Modal.Footer>
                </Form>
              </Surface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default GiveReviewModal;
