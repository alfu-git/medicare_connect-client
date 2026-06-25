import { fetchDataSecurely } from "../server/server";

export const getPaymentsByPatientId = async (patientId) => {
  return fetchDataSecurely(`/payments/${patientId}`);
};

export const getPaymentsByDoctorId = async (doctorId) => {
  return fetchDataSecurely(`/doctor-payments/${doctorId}`);
};
