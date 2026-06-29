import { headers } from "next/headers";
import { auth } from "../auth";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const getToken = async () => {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  return token || null;
};

export const fetchData = async (path) => {
  const res = await fetch(`${serverUrl}${path}`);
  const data = await res.json();
  return data;
};

export const fetchDataSecurely = async (path) => {
  const token = await getToken();

  const res = await fetch(`${serverUrl}${path}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
};

export const serverMutation = async (path, data, method) => {
  "use server";

  const token = await getToken();

  const res = await fetch(`${serverUrl}${path}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return res.json();
};
