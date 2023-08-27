export const getData = async <T>(url: string): Promise<T> => {
  const res: Response = await fetch(url, {
    method: "GET",
    headers: new Headers({ "Content-Type": "application/json" }),
  });

  if (!res.ok) {
    console.log("Error in GET", { url, res });
    throw new Error(res.statusText);
  }

  const value = await res.json();

  return value;
};
