import { RESOURCES } from "@/constants";
import { fetchApi } from "./fetch";
import { AuthResponse, UserPayload } from "@/interfaces";

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
