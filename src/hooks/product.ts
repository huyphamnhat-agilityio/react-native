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
    queryKey: [QUERY_KEY.PRODUCTS, params],
    queryFn: async () => await getProducts(params),
  });

export const useGetInfinitiveProducts = (
  params?: QueryParams<Omit<Product, 'variants'>>,
) => {
  const getMoreProducts = async (
    pageParam: number,
    queryParam?: QueryParams<Omit<Product, 'variants'>>,
  ) => {
    const query: QueryParams<Omit<Product, 'variants'>> = {
      ...params,
      page: queryParam?.page ?? 0 + pageParam,
      limit: 6,
    };

    const result = await getProducts(query);

    return {data: [...result], pageParam: pageParam};
  };

  const {data, ...rest} = useInfiniteQuery({
    queryKey: [QUERY_KEY.PRODUCTS, params],
    queryFn: async ({pageParam = 1}) =>
      await getMoreProducts(pageParam, params),
    getNextPageParam: lastPages => {
      if (lastPages.data.length < 6) {
        return undefined;
      }

      return lastPages.pageParam + 1;
    },
    initialPageParam: 1,
  });

  const products = data?.pages.flatMap(page => page.data) || [];

  const queryClient = useQueryClient();

  const resetData = useCallback(
    () => queryClient.resetQueries({queryKey: [QUERY_KEY.PRODUCTS, params]}),
    [params, queryClient],
  );
  return {
    data: products,
    resetData,
    ...rest,
  };
};

export const useProductDetail = (id: string) =>
  useQuery({
    queryKey: [QUERY_KEY.PRODUCT, id],
    queryFn: async () => await getProduct(id),
  });
