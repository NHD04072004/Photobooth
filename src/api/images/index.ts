import { API_URL } from "../../config";

export const postSelectedImages = async (images: File[]) => {
  const sessionId = localStorage.getItem("sessionId");
  const formData = new FormData();
  images.forEach((image) => {
    formData.append(`files`, image);
  });
  console.log(formData);

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

export const getComposedImage = async () => {
  const sessionId = localStorage.getItem("sessionId");
  const response = await fetch(`${API_URL}/sessions/${sessionId}/composed`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to get composed image");
  }

  return await response.blob();
};
