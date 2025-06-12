import {fetchApiWithAuth} from './fetch';

// Constants
import {RESOURCES} from 'src/constants';

// Types & Interfaces
import {Product, QueryContexts, QueryParams} from 'src/interfaces';

// Utils
import {toQueryString} from 'src/utils';

export const getProducts = async ({
  queryKey: [{params}],
  pageParam,
}: QueryContexts['PRODUCTS']) => {
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
}: QueryContexts['PRODUCT']) => {
  const product = await fetchApiWithAuth<Product>(
    `${process.env.API_URL}/${RESOURCES.PRODUCTS}/${id}`,
  );

  return product;
};
