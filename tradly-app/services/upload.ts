import Constants from "expo-constants";
import { fetchApi } from "./fetch";

// Types & Interfaces
import { ImgBBResponse } from "@/interfaces";

const UPLOAD_IMAGE_URL = Constants.expoConfig?.extra?.UPLOAD_IMAGE_URL;
const IMGBB_API_KEY = Constants.expoConfig?.extra?.IMGBB_API_KEY;

export const uploadImage = async (image: FormData): Promise<string> => {
  const response = await fetchApi<ImgBBResponse>(
    `${UPLOAD_IMAGE_URL}?key=${IMGBB_API_KEY}`,
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
