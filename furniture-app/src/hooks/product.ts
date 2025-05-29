import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {useCallback} from 'react';
import {QUERY_KEY} from 'src/constants';
import {Product, QueryParams} from 'src/interfaces';
import {getProduct, getProducts} from 'src/services';

export const useGetProducts = (
  params?: QueryParams<Omit<Product, 'variants'>>,
) =>
  useQuery({
    queryKey: QUERY_KEY.PRODUCTS(params),
    queryFn: () => getProducts,
  });

export const useGetInfinitiveProducts = (
  params?: QueryParams<Omit<Product, 'variants'>>,
) => {
  const {data, ...rest} = useInfiniteQuery({
    queryKey: QUERY_KEY.PRODUCTS(params),
    queryFn: getProducts,
    getNextPageParam: (lastPages, _, lastPageParam) => {
      if (lastPages.length < 6) {
        return undefined;
      }

      return lastPageParam + 1;
    },
    initialPageParam: 1,
    retry: 1,
  });

  const products = data?.pages.flatMap(page => page) || [];

  const queryClient = useQueryClient();

  const resetData = useCallback(() => {
    queryClient.resetQueries({queryKey: QUERY_KEY.PRODUCTS(params)});
  }, [params, queryClient]);

  return {
    data: products,
    resetData,
    ...rest,
  };
};

export const useProductDetail = (id: string) =>
  useQuery({
    queryKey: QUERY_KEY.PRODUCT(id),
    queryFn: getProduct,
  });
