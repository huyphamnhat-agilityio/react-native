import { RESOURCES } from "@/constants";
import { fetchApiWithAuth } from "./fetch";

// Types & Interfaces
import { User } from "@/interfaces";

export const updateUser = async (payload: Partial<User>) => {
  const { id = "", ...rest } = payload;
  await fetchApiWithAuth(
    `${process.env.EXPO_PUBLIC_API_URL}/${RESOURCES.USERS}/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify(rest),
    },
  );
};
