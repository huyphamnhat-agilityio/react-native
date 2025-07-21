import { fetchApi } from "./fetch";

// Types & Interfaces
import { ImgBBResponse } from "@/interfaces";

export const uploadImage = async (image: FormData): Promise<string> => {
  const response = await fetchApi<ImgBBResponse>(
    `${process.env.EXPO_PUBLIC_UPLOAD_IMAGE_URL}?key=${process.env.EXPO_PUBLIC_IMGBB_API_KEY}`,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      method: "POST",
      body: image,
    },
  );

  return response.data.url;
};
