import { fetchApiWithAuth } from "./fetch";

// Constants
import { RESOURCES } from "@/constants";

// Types & Interfaces
import { Cart, QueryContexts } from "@/interfaces";

export const getCart = async ({
  queryKey: [{ params }],
}: QueryContexts["CARTS"]) => {
  const result = await fetchApiWithAuth<Cart>(
    `${process.env.EXPO_PUBLIC_API_URL}/${RESOURCES.CARTS}${
      params?.id ? `/${params.id}` : ""
    }`,
  );

  return result;
};

export const updateCart = async (payload: Omit<Cart, "id">) => {
  const { userId, items } = payload;
  await fetchApiWithAuth<Cart>(
    `${process.env.API_URL}/${RESOURCES.CARTS}/${userId}`,
    {
      method: "PATCH",
      body: JSON.stringify({ items }),
    },
  );
};
