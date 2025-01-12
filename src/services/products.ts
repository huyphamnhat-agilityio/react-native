import {Product} from 'src/interfaces';
import {fetchApi} from './fetch';
import {RESOURCES} from 'src/constants';

export const getProducts = async () => {
  const products = await fetchApi<Product[]>(
    `${process.env.API_URL}/${RESOURCES.PRODUCTS}`,
  );

  return products;
};
