import Constants from "expo-constants";
import { fetchApi } from "./fetch";

// Interfaces
import { AuthResponse, UserPayload } from "@/interfaces";

// Constants
import { RESOURCES } from "@/constants";

const API_URL = Constants.expoConfig?.extra?.API_URL;

export const login = async (
  payload: Pick<UserPayload, "email" | "password">,
) => {
  const authCredential = await fetchApi<AuthResponse>(
    `${API_URL}/${RESOURCES.LOGIN}`,
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
  );

  return authCredential;
};
