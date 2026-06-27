import { fetchDataSecurely } from "../server/server";

export const getPrescriptionByAppointmentIdForDoctor = (appointmentId) => {
  return fetchDataSecurely(`/doctor-prescription/${appointmentId}`);
};
