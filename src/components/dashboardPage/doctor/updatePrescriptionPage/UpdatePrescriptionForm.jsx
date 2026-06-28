"use client";

import { Button, Form, TextArea } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const UpdatePrescriptionForm = ({
  prescription,
  updatePrescriptionWrapper,
}) => {
  const [diagnosisValue, setDiagnosisValue] = useState(
    prescription?.diagnosis || "",
  );
  const [medicinesValue, setMedicinesValue] = useState(
    prescription?.medicines || "",
  );
  const [adviceValue, setAdviceValue] = useState(prescription?.advice || "");
  const [loading, setLoading] = useState(false);

  const initialValues = React.useMemo(
    () => ({
      diagnosis: prescription?.diagnosis || "",
      medicines: prescription?.medicines || "",
      advice: prescription?.advice || "",
    }),
    [prescription],
  );

  const isChanged =
    diagnosisValue !== initialValues.diagnosis ||
    medicinesValue !== initialValues.medicines ||
    adviceValue !== initialValues.advice;

  const isAnyFieldEmpty =
    !diagnosisValue.trim() || !medicinesValue.trim() || !adviceValue.trim();

  const router = useRouter();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const updatedPrescription = {
      diagnosis: diagnosisValue || prescription?.diagnosis,
      medicines: medicinesValue || prescription?.medicines,
      advice: adviceValue || prescription?.advice,
    };

    try {
      setLoading(true);

      const res = await updatePrescriptionWrapper(updatedPrescription);

      if (res?.modifiedCount > 0) {
        toast.success("Prescription Update Successful");
        setLoading(false);
        router.push("/dashboard/doctor/prescription-management");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something Went Wrong!");
    }
  };

  const textareaClass =
    "w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#17a2b8] resize-none";

  return (
    <div className="min-h-screen flex justify-center items-center animate__animated animate__zoomIn">
      <div className="relative w-full max-w-4xl bg-white shadow-2xl rounded-2xl p-8 overflow-hidden">
        {/* 🔥 Watermark Logo */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <Image
            src="/images/medicare-logo.png"
            alt="medicare-logo"
            width={300}
            height={300}
            className="w-96 h-auto object-contain"
          />
        </div>

        {/* 🧾 Header */}
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-blue-600">
              MediCare Connect
            </h1>

            <p className="text-sm text-gray-500">Smart Healthcare Platform</p>
          </div>

          <div className="text-right">
            <h2 className="font-semibold text-lg">
              {prescription?.doctorName}
            </h2>
            <p className="text-sm text-gray-500">
              {prescription?.doctorSpecialization}
            </p>
          </div>
        </div>

        {/* 👤 Patient Info */}
        <div className="mb-6">
          <div className="mb-6 flex flex-wrap sm:flex-nowrap gap-3 items-center sm:justify-between">
            <p>
              <span className="font-semibold">Patient:</span>{" "}
              {prescription?.patientName}
            </p>

            <p>
              <span className="font-semibold">Gender:</span>{" "}
              {prescription?.patientGender}
            </p>

            <p>
              <span className="font-semibold">Age:</span>{" "}
              {prescription?.patientAge}
            </p>

            <p>
              <span className="font-semibold">Number:</span>{" "}
              {prescription?.patientNumber}
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap gap-3 items-center sm:justify-between">
            <p>
              <span className="font-semibold">Day:</span>{" "}
              {prescription?.appointmentDay}
            </p>

            <p>
              <span className="font-semibold">Time:</span>{" "}
              {prescription?.appointmentTime}
            </p>

            <p>
              <span className="font-semibold">Date:</span>{" "}
              {new Date(prescription?.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* 🩺 Symptoms */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-700 mb-2">Symptoms</h3>

          <p className="text-gray-600 border p-3 rounded-lg bg-gray-50">
            {prescription?.symptoms}
          </p>
        </div>

        <Form onSubmit={handleFormSubmit}>
          {/* 🧠 Diagnosis */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-2">Diagnosis</h3>

            <TextArea
              aria-describedby="textarea-controlled-description"
              aria-label="Announcement"
              placeholder="Write diagnosis..."
              value={diagnosisValue}
              onChange={(event) => {
                setDiagnosisValue(event.target.value);
              }}
              rows={5}
              className={textareaClass}
            />
          </div>

          {/* 💊 Medicines */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-2">Medicines</h3>

            <TextArea
              aria-describedby="textarea-controlled-description"
              aria-label="Announcement"
              placeholder="Write medicine..."
              value={medicinesValue}
              onChange={(event) => {
                setMedicinesValue(event.target.value);
              }}
              rows={5}
              className={textareaClass}
            />
          </div>

          {/* 📝 Advice */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-2">Advice</h3>

            <TextArea
              aria-describedby="textarea-controlled-description"
              aria-label="Announcement"
              placeholder="Write advice..."
              value={adviceValue}
              onChange={(event) => {
                setAdviceValue(event.target.value);
              }}
              rows={5}
              className={textareaClass}
            />
          </div>

          {/* CTA */}
          <div className="flex gap-4 items-center justify-end">
            <Button
              onClick={() => {
                setDiagnosisValue(initialValues.diagnosis);
                setMedicinesValue(initialValues.medicines);
                setAdviceValue(initialValues.advice);
              }}
              isDisabled={!isChanged}
              variant="danger-soft"
              className={"border border-red-500/30 rounded-md"}
            >
              Clear
            </Button>

            <Button
              type="submit"
              isDisabled={!isChanged || isAnyFieldEmpty || loading}
              className={"bg-[#0b0b3b] hover:bg-[#0b0b3b]/95 rounded-md"}
            >
              {loading ? "Please Wait..." : "Update"}
            </Button>
          </div>
        </Form>

        {/* ✍️ Footer */}
        <div className="flex justify-between items-end mt-10">
          <p className="text-sm text-gray-500">
            Follow the prescription carefully.
          </p>

          <div className="text-right">
            <p className="font-semibold">{prescription?.doctorName}</p>

            <p className="text-sm text-gray-500">Signature</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePrescriptionForm;
