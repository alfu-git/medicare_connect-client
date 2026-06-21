import { fetchData } from "../server/server";

export const getPaymentsByPatientId = async (patientId) => {
  return fetchData(`/payments/${patientId}`);
};
