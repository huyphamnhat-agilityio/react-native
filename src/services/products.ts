import {Product, QueryParams} from 'src/interfaces';
import {fetchApi} from './fetch';
import {CATGORIES, RESOURCES} from 'src/constants';
import {toQueryString} from 'src/utils';

export const getProducts = async (
  params?: QueryParams<Omit<Product, 'variants'>>,
) => {
  if (params?.category === CATGORIES[0].title) {
    params.category = '';
  }

  const products = await fetchApi<Product[]>(
    `${process.env.API_URL}/${RESOURCES.PRODUCTS}${toQueryString(params)}`,
  );

  return products;
};
