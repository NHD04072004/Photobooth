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
};

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
};

export const postSelectedFrame = async () => {
  try {
    const session_id = localStorage.getItem("sessionId");
    const frameFamilyId = localStorage.getItem("frameFamilyId");
    const frameOptionId = localStorage.getItem("frameOptionId");
    console.log(session_id);
    console.log(frameFamilyId);
    console.log(frameOptionId);
    const response = await fetch(
      `${API_URL}/sessions/${session_id}/select-frame`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          frame_family_id: frameFamilyId,
          frame_option_id: frameOptionId,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to select frame");
    }
    return await response.json();
  } catch (error) {
    console.error("Error selecting frame:", error);
    throw error;
  }
};
