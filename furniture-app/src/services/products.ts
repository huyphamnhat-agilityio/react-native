import {QueryFunctionContext} from '@tanstack/react-query';
import {CATEGORIES, ERROR_MESSAGE, QUERY_KEY, RESOURCES} from 'src/constants';
import {Product, QueryParams} from 'src/interfaces';
import {toQueryString} from 'src/utils';

import {fetchApi} from './fetch';

export const getProducts = async ({
  queryKey: [{params}],
  pageParam,
}: QueryFunctionContext<ReturnType<(typeof QUERY_KEY)['PRODUCTS']>>) => {
  try {
    const query: QueryParams<Omit<Product, 'variants'>> = {
      ...params,
      page: params?.page ?? 0 + (pageParam as number),
      limit: 6,
      category:
        params?.category === CATEGORIES[0].title ? '' : params?.category,
    };
    const products = await fetchApi<Product[]>(
      `${process.env.API_URL}/${RESOURCES.PRODUCTS}${toQueryString(query)}`,
    );

    return products;
  } catch (error) {
    if (typeof error === 'number') {
      throw new Error(ERROR_MESSAGE.PRODUCT_LIST[`${error}`]);
    }
    throw new Error(ERROR_MESSAGE.PRODUCT_LIST['500']);
  }
};

export const getProduct = async ({
  queryKey: [{id}],
}: QueryFunctionContext<ReturnType<(typeof QUERY_KEY)['PRODUCT']>>) => {
  const product = await fetchApi<Product>(
    `${process.env.API_URL}/${RESOURCES.PRODUCTS}/${id}`,
  );

  return product;
};
