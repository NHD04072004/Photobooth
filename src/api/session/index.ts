import { API_URL } from "../../config";

export const postSession = async () => {
  const response = await fetch(`${API_URL}/sessions`, { method: "POST" });
  if (!response.ok) {
    throw new Error("Failed to create session");
  }
  return await response.json();
};
