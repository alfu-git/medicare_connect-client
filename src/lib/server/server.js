const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchData = async (path) => {
  const res = await fetch(`${baseUrl}${path}`, {
    cache: "no-store",
  });
  const data = await res.json();
  console.log(data);
  return data;
};
