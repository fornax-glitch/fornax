import { config } from "../../app/config";

export const createBooking = async (data: any) => {
  const res = await fetch(`${config.api.baseUrl}/booking`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Booking failed");
  return res.json();
};