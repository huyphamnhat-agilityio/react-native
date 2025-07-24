import Constants from "expo-constants";
import { RESOURCES } from "@/constants";
import { fetchApiWithAuth } from "./fetch";

// Types & Interfaces
import { User } from "@/interfaces";

const API_URL = Constants.expoConfig?.extra?.API_URL;

export const updateUser = async (payload: Partial<User>) => {
  const { id = "", ...rest } = payload;
  await fetchApiWithAuth(`${API_URL}/${RESOURCES.USERS}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(rest),
  });
};
