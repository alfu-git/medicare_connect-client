import { fetchData } from "../server/server";

export const getAppointmentsByPatientId = async (patientId) => {
  return await fetchData(`/appointments/${patientId}`);
};
