import { fetchDataSecurely } from "../server/server";

export const getPrescriptionByAppointmentIdForDoctor = (appointmentId) => {
  return fetchDataSecurely(`/doctor-prescription/${appointmentId}`);
};

export const getPrescriptionsByDoctorId = async (doctorId) => {
  return fetchDataSecurely(`/get-doctor-prescriptions/${doctorId}`);
};

export const getPrescriptionByPrescriptionIdForDoctor = async (
  prescriptionId,
) => {
  return fetchDataSecurely(`/doctor-prescriptions/${prescriptionId}`);
};
