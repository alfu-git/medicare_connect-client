import { serverMutation } from "../server/server";

export const postAppointmentData = async (appointmentData) => {
  return await serverMutation("/appointments", appointmentData, "POST");
};
