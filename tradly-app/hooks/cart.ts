import { useMutation, useQuery } from "@tanstack/react-query";

// Types & Interfaces
import { Cart, CartItemData, QueryParams } from "@/interfaces";

// Constants
import { QUERY_KEY } from "@/constants";

// Services
import { getCart, updateCart } from "@/services";

export const useGetCart = (params?: QueryParams<Pick<Cart, "userId" | "id">>) =>
  useQuery({
    queryKey: QUERY_KEY.CARTS(params),
    queryFn: getCart,
  });

export const useUpdateCart = () =>
  useMutation<
    void,
    Error,
    { userId: string; items: CartItemData[] },
    { previousData?: Cart }
  >({
    mutationFn: updateCart,
  });
