import Image from "next/image";
import React from "react";

const PrescriptionComponent = ({ prescription }) => {
  if (!prescription) return null;

  const {
    doctorName,
    doctorSpecialization,
    patientName,
    patientAge,
    patientGender,
    patientNumber,
    appointmentDay,
    appointmentTime,
    diagnosis,
    medicines,
    advice,
  } = prescription;

  const medicineList = medicines
    ? medicines.split(",").map((m) => m.trim())
    : [];

  return (
    <div className="max-w-4xl mx-auto my-8 animate__animated animate__lightSpeedInRight">
      <div className="relative overflow-hidden bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 ease-out transform hover:-translate-y-1 border border-gray-100 p-8 md:p-12">
        {/* watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 select-none pointer-events-none transform transition-transform duration-700 hover:scale-110">
          <Image
            src="/images/medicare-logo.png"
            alt="medicare-logo"
            width={300}
            height={400}
            className="w-4/5 h-auto object-contain max-w-md"
          />
        </div>

        {/* 🧾 header*/}
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center border-b-2 border-[#17a2b8]/20 pb-6 mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-[#0c2f25]">
              {doctorName || "Doctor Name"}
            </h1>

            <p className="text-sm font-medium text-[#17a2b8] mt-1 tracking-wide uppercase">
              {doctorSpecialization || "Specialist"}
            </p>

            <p className="text-xs text-[#6d8276] mt-0.5">
              MediCare Connect Certified Platform
            </p>
          </div>

          <div className="md:text-right border-l-4 md:border-l-0 md:border-r-4 border-[#0b0b3b] pl-4 md:pl-0 pr-0 md:pr-4 py-1">
            <h2 className="text-xl font-bold text-[#0b0b3b] tracking-wider">
              MEDICARE
            </h2>

            <p className="text-xs text-[#6d8276] tracking-tight">
              Smart Healthcare Platform
            </p>
          </div>
        </div>

        {/* patient and appointment info*/}
        <div className="relative z-10 bg-[#F6F6F6] rounded-xl p-6 mb-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-6 border border-gray-150">
          <div>
            <span className="block text-[11px] font-bold text-[#6d8276] uppercase tracking-wider">
              Patient Name
            </span>

            <span className="text-sm font-semibold text-[#0c2f25]">
              {patientName || "N/A"}
            </span>
          </div>

          <div>
            <span className="block text-[11px] font-bold text-[#6d8276] uppercase tracking-wider">
              Age / Gender
            </span>

            <span className="text-sm font-semibold text-[#0c2f25]">
              {patientAge || "—"} {patientGender ? `/ ${patientGender}` : ""}
            </span>
          </div>

          <div>
            <span className="block text-[11px] font-bold text-[#6d8276] uppercase tracking-wider">
              Contact Number
            </span>

            <span className="text-sm font-semibold text-[#0c2f25]">
              {patientNumber || "—"}
            </span>
          </div>

          <div>
            <span className="block text-[11px] font-bold text-[#6d8276] uppercase tracking-wider">
              Schedule
            </span>

            <span className="text-sm font-semibold text-[#0c2f25]">
              {appointmentDay || "—"}{" "}
              <span className="text-xs text-[#6d8276] font-normal">
                ({appointmentTime || "—"})
              </span>
            </span>
          </div>
        </div>

        {/* prescription main body */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 min-h-87.5">
          {/* left column: diagnosis/clinical note */}
          <div className="md:col-span-1 border-r-0 md:border-r border-gray-100 pr-0 md:pr-6">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#0c2f25]">
                Diagnosis
              </h3>
            </div>

            <div className="bg-[#F6F6F6]/50 rounded-xl p-4 border border-gray-100 min-h-30">
              <p className="text-sm text-[#0c2f25] whitespace-pre-line leading-relaxed italic">
                {diagnosis || "No specific diagnosis recorded."}
              </p>
            </div>
          </div>

          {/* right column: Rx/medicine and advice */}
          <div className="md:col-span-2 flex flex-col justify-between">
            <div>
              {/* Rx symbol */}
              <div className="text-3xl font-serif font-black text-[#17a2b8] italic tracking-tighter mb-4 select-none">
                R
                <span className="text-xl font-sans not-italic font-bold align-super">
                  x
                </span>
              </div>

              {/* medicine */}
              <div className="space-y-3.5 pl-2 mb-8">
                {medicineList.length > 0 ? (
                  medicineList.map((medicine, index) => (
                    <div key={index} className="flex items-start gap-3 group">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#17a2b8] group-hover:scale-125 transition-transform"></span>
                      <p className="text-base font-medium text-[#0c2f25] tracking-wide">
                        {medicine}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-[#6d8276] italic">
                    No medicines prescribed.
                  </p>
                )}
              </div>

              {/* advice */}
              {advice && (
                <div className="mt-6 p-4 bg-[#17a2b8]/5 rounded-xl border-l-4 border-[#17a2b8]">
                  <h4 className="text-xs font-bold text-[#0c2f25] uppercase tracking-wider mb-1">
                    Advice & Instructions
                  </h4>

                  <p className="text-sm text-[#6d8276] leading-relaxed">
                    {advice}
                  </p>
                </div>
              )}
            </div>

            {/* footer */}
            <div className="mt-12 pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-xs text-[#6d8276] italic text-center sm:text-left">
                * Please follow the prescription carefully and complete the full
                course.
              </p>

              <div className="text-center sm:text-right min-w-37.5">
                <div className="font-serif italic text-lg text-[#17a2b8] opacity-80 select-none transform -rotate-2 tracking-wide mb-1 px-2">
                  {doctorName}
                </div>

                <div className="w-full h-px bg-gray-200 my-1"></div>

                <p className="text-[10px] font-bold text-[#0c2f25] uppercase tracking-widest">
                  Authorized Signature
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionComponent;
