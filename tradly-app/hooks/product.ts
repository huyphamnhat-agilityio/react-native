import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

// Constants
import { PRODUCT_PAGE_SIZE, QUERY_KEY } from "@/constants";

// Services
import { getProducts } from "@/services/products";

// Types & Interfaces
import { Product, QueryParams } from "@/interfaces";

export const useGetProducts = (params?: QueryParams<Product>) => {
  const { data, ...rest } = useInfiniteQuery({
    queryKey: QUERY_KEY.PRODUCTS(params),
    queryFn: getProducts,
    getNextPageParam: (lastPages, _, lastPageParam) => {
      if (lastPages.length < PRODUCT_PAGE_SIZE) {
        return undefined;
      }

      return lastPageParam + 1;
    },
    initialPageParam: 1,
    retry: 1,
  });

  const products = data?.pages.flatMap((page) => page) || [];

  const queryClient = useQueryClient();

  const resetData = useCallback(() => {
    queryClient.resetQueries({ queryKey: QUERY_KEY.PRODUCTS(params) });
  }, [params, queryClient]);

  return {
    data: products,
    resetData,
    ...rest,
  };
};
