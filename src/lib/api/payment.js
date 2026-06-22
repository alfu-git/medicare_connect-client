import { fetchDataSecurely } from "../server/server";

export const getPaymentsByPatientId = async (patientId) => {
  return fetchDataSecurely(`/payments/${patientId}`);
};
