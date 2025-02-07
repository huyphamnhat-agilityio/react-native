import {Product, QueryParams} from 'src/interfaces';
import {fetchApi} from './fetch';
import {CATEGORIES, ERROR_MESSAGE, RESOURCES} from 'src/constants';
import {toQueryString} from 'src/utils';

export const getProducts = async (
  params?: QueryParams<Omit<Product, 'variants'>>,
) => {
  try {
    if (params?.category === CATEGORIES[0].title) {
      params.category = '';
    }

    const products = await fetchApi<Product[]>(
      `${process.env.API_URL}/${RESOURCES.PRODUCTS}${toQueryString(params)}`,
    );

    return products;
  } catch (error) {
    if (typeof error === 'number') {
      throw new Error(ERROR_MESSAGE.PRODUCT_LIST[`${error}`]);
    }
    throw new Error(ERROR_MESSAGE.PRODUCT_LIST['500']);
  }
};

export const getProduct = async (id: string) => {
  const product = await fetchApi<Product>(
    `${process.env.API_URL}/${RESOURCES.PRODUCTS}/${id}`,
  );

  return product;
};
