import { fetchDataSecurely } from "../server/server";

export const getReviewsByPatientId = async (patientId) => {
  return fetchDataSecurely(`/patient-reviews/${patientId}`);
};

export const getReviewsByDoctorId = async (doctorId) => {
  return fetchDataSecurely(`/doctor-reviews/${doctorId}`);
};
