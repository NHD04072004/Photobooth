import { API_URL } from "../../config";

export const getAllFrames = async () => {
  try {
    const response = await fetch(`${API_URL}/frames`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch frames");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching frames:", error);
    throw error;
  }
}

export const getFrameById = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/frames/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch frame");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching frame:", error);
    throw error;
  }
}