import {useQuery} from '@tanstack/react-query';
import {QUERY_KEY} from 'src/constants';
import {Product, QueryParams} from 'src/interfaces';
import {getProducts} from 'src/services';

export const useGetProducts = (
  params?: QueryParams<Omit<Product, 'variants'>>,
) =>
  useQuery({
    queryKey: [QUERY_KEY.PRODUCTS, params],
    queryFn: async () => await getProducts(params),
  });
