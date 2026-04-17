import { config } from "../../app/config";

export const getCars = async () => {
  const res = await fetch(`${config.api.baseUrl}/cars`);

  if (!res.ok) throw new Error("Failed to fetch cars");

  return res.json();
};