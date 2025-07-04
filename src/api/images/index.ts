import { API_URL } from "../../config";

export const postSelectedImages = async (images: File[]) => {
  const sessionId = localStorage.getItem("sessionId");
  const formData = new FormData();
  images.forEach((image) => {
    formData.append(`files`, image);
  });

  const response = await fetch(
    `${API_URL}/sessions/${sessionId}/upload-photos`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Failed to upload images");
  }

  return await response.json();
};

export const composeImage = async () => {
  const sessionId = localStorage.getItem("sessionId");
  const response = await fetch(`${API_URL}/sessions/${sessionId}/compose`, {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Failed to compose image");
  }

  return await response.json();
};
