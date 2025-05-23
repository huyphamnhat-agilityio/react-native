import {Product, QueryParams} from 'src/interfaces';

export const QUERY_KEY = {
  PRODUCTS: (params?: QueryParams<Omit<Product, 'variants'>>) =>
    [{scope: 'products', params}] as const,
  PRODUCT: (id: string) => [{scope: 'product', id}] as const,
} as const;
