"use server";
import { serverMutation } from "../server/server";

export const savePaymentData = async (data) => {
  return await serverMutation("/payments", data, "POST");
};
