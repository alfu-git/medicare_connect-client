const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const fetchData = async (path) => {
  const res = await fetch(`${serverUrl}${path}`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
};

export const serverMutation = async (path, data, method) => {
  "use server";

  const res = await fetch(`${serverUrl}${path}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};
