import {fetchApiWithAuth} from './fetch';
import {QueryFunctionContext} from '@tanstack/react-query';

// Constants
import {QUERY_KEY, RESOURCES} from 'src/constants';

// Types & Interfaces
import {Product, QueryParams} from 'src/interfaces';

// Utils
import {toQueryString} from 'src/utils';

export const getProducts = async ({
  queryKey: [{params}],
  pageParam,
}: QueryFunctionContext<ReturnType<(typeof QUERY_KEY)['PRODUCTS']>>) => {
  const query: QueryParams<Product> = {
    ...params,
    _page: (params?._page ?? 0) + (pageParam as number),
    _limit: 6,
  };

  const result = await fetchApiWithAuth<Product[]>(
    `${process.env.API_URL}/${RESOURCES.PRODUCTS}${toQueryString(query)}`,
  );

  return result;
};

export const getProduct = async ({
  queryKey: [{id}],
}: QueryFunctionContext<ReturnType<(typeof QUERY_KEY)['PRODUCT']>>) => {
  const product = await fetchApiWithAuth<Product>(
    `${process.env.API_URL}/${RESOURCES.PRODUCTS}/${id}`,
  );

  return product;
};
