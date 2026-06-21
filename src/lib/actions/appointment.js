'use server'
import { serverMutation } from "../server/server";

export const postAppointmentData = async (data) => {
  return await serverMutation("/appointments", data, "POST");
};
