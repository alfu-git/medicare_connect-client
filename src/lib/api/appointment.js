import { fetchDataSecurely } from "../server/server";

export const getAppointmentsByPatientId = async (patientId) => {
  return await fetchDataSecurely(`/get-patient-appointments/${patientId}`);
};

// for patient
export const getAppointmentByAppointmentId = async (appointmentId) => {
  return await fetchDataSecurely(`/appointment/${appointmentId}`);
};

export const getAppointmentsByDoctorId = async (doctorId) => {
  return await fetchDataSecurely(`/doctor-appointments/${doctorId}`);
};

// for doctor
export const getAppointmentByAppointmentIdForDoctor = async (appointmentId) => {
  return await fetchDataSecurely(
    `/patient-appointment-details/${appointmentId}`,
  );
};

export const getTotalAppointments = async () => {
  return fetchDataSecurely("/total-appointments");
};
