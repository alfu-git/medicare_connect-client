"use client";

import { Button, Form, TextArea } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const DoctorPrescriptionForm = ({ appointment, postPrescriptionWrapper }) => {
  const [diagnosisValue, setDiagnosisValue] = useState("");
  const [medicinesValue, setMedicinesValue] = useState("");
  const [adviceValue, setAdviceValue] = useState("");
  const [loading, setLoading] = useState(false);

  const hasOneInput = diagnosisValue || medicinesValue || adviceValue;
  const isComplete = diagnosisValue && medicinesValue && adviceValue;

  const router = useRouter();

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const prescriptionData = {
      patientId: appointment?.patientId,
      patientName: appointment?.patientName,
      patientAge: appointment?.patientAge || "",
      patientGender: appointment?.patientGender || "",
      patientNumber: appointment?.patientNumber || "",
      doctorId: appointment?.doctorId,
      doctorName: appointment?.doctorName,
      doctorSpecialization: appointment?.doctorSpecialization,
      appointmentId: appointment?._id,
      appointmentDay: appointment?.appointmentDay,
      appointmentTime: appointment?.appointmentTime,
      symptoms: appointment?.symptoms,
      diagnosis: diagnosisValue,
      medicines: medicinesValue,
      advice: adviceValue,
    };

    try {
      setLoading(true);

      const res = await postPrescriptionWrapper(prescriptionData);

      if (res?.insertedId) {
        toast.success("Prescription has been completed and saved");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something Went Wrong!");
    } finally {
      setLoading(false);
      setDiagnosisValue("");
      setMedicinesValue("");
      setAdviceValue("");

      router.push("/dashboard/doctor/prescription-management");
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
            <h2 className="font-semibold text-lg">{appointment?.doctorName}</h2>
            <p className="text-sm text-gray-500">
              {appointment?.doctorSpecialization}
            </p>
          </div>
        </div>

        {/* 👤 Patient Info */}
        <div className="mb-6">
          <div className="mb-6 flex flex-wrap sm:flex-nowrap gap-3 items-center sm:justify-between">
            <p>
              <span className="font-semibold">Patient:</span>{" "}
              {appointment?.patientName}
            </p>

            <p>
              <span className="font-semibold">Gender:</span>{" "}
              {appointment?.patientGender}
            </p>

            <p>
              <span className="font-semibold">Age:</span>{" "}
              {appointment?.patientAge}
            </p>

            <p>
              <span className="font-semibold">Number:</span>{" "}
              {appointment?.patientNumber}
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap gap-3 items-center sm:justify-between">
            <p>
              <span className="font-semibold">Day:</span>{" "}
              {appointment?.appointmentDay}
            </p>

            <p>
              <span className="font-semibold">Time:</span>{" "}
              {appointment?.appointmentTime}
            </p>

            <p>
              <span className="font-semibold">Date:</span>{" "}
              {new Date(appointment?.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* 🩺 Symptoms */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-700 mb-2">Symptoms</h3>

          <p className="text-gray-600 border p-3 rounded-lg bg-gray-50">
            {appointment?.symptoms}
          </p>
        </div>

        <Form onSubmit={handleOnSubmit}>
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
                setDiagnosisValue("");
                setMedicinesValue("");
                setAdviceValue("");
              }}
              isDisabled={!hasOneInput}
              variant="danger-soft"
              className={"border border-red-500/30 rounded-md"}
            >
              Clear
            </Button>

            <Button
              type="submit"
              isDisabled={!isComplete || loading}
              className={"bg-[#0b0b3b] hover:bg-[#0b0b3b]/95 rounded-md"}
            >
              {loading ? "Completing..." : "Complete"}
            </Button>
          </div>
        </Form>

        {/* ✍️ Footer */}
        <div className="flex justify-between items-end mt-10">
          <p className="text-sm text-gray-500">
            Follow the prescription carefully.
          </p>

          <div className="text-right">
            <p className="font-semibold">{appointment?.doctorName}</p>

            <p className="text-sm text-gray-500">Signature</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorPrescriptionForm;
