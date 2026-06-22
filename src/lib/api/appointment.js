import { fetchDataSecurely } from "../server/server";

export const getAppointmentsByPatientId = async (patientId) => {
  return await fetchDataSecurely(`/appointments/${patientId}`);
};

export const getAppointmentByAppointmentId = async (appointmentId) => {
  return await fetchDataSecurely(`/appointment/${appointmentId}`);
};
