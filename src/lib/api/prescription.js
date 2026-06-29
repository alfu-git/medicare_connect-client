import { fetchDataSecurely } from "../server/server";

export const getPrescriptionByAppointmentIdForDoctor = (appointmentId) => {
  return fetchDataSecurely(`/doctor-prescription/${appointmentId}`);
};

export const getPrescriptionsByDoctorId = async (doctorId) => {
  return fetchDataSecurely(`/get-doctor-prescriptions/${doctorId}`);
};

export const getPrescriptionByAppointmentIdForPatient = async (
  appointmentId,
) => {
  return fetchDataSecurely(`/patient-prescription/${appointmentId}`);
};

export const getPrescriptionByPrescriptionIdForDoctor = async (
  prescriptionId,
) => {
  return fetchDataSecurely(`/doctor-prescriptions/${prescriptionId}`);
};
