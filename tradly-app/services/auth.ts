import { fetchApi } from "./fetch";

// Interfaces
import { AuthResponse, UserPayload } from "@/interfaces";

// Constants
import { RESOURCES } from "@/constants";

export const login = async (
  payload: Pick<UserPayload, "email" | "password">,
) => {
  const authCredential = await fetchApi<AuthResponse>(
    `${process.env.EXPO_PUBLIC_API_URL}/${RESOURCES.LOGIN}`,
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
  );

  return authCredential;
};
