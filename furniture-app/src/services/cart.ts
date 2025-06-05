import {QueryFunctionContext} from '@tanstack/react-query';
import {QUERY_KEY, RESOURCES} from 'src/constants';
import {Cart, CartPayload} from 'src/interfaces';
import {fetchApiWithAuth} from './fetch';

export const createCart = async (userId: string) => {
  const payload: CartPayload = {
    userId,
    items: [],
  };

  await fetchApiWithAuth(`${process.env.API_URL}/${RESOURCES.CARTS}`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
};

export const getCart = async ({
  queryKey: [{params}],
}: QueryFunctionContext<ReturnType<(typeof QUERY_KEY)['CARTS']>>) => {
  const result = await fetchApiWithAuth<Cart>(
    `${process.env.API_URL}/${RESOURCES.CARTS}${
      params?.id ? `/${params.id}` : ''
    }`,
  );

  return result;
};

export const updateCart = async (payload: Omit<Cart, 'id'>) => {
  const {userId, items} = payload;
  const result = await fetchApiWithAuth<Cart>(
    `${process.env.API_URL}/${RESOURCES.CARTS}/${userId}`,
    {
      method: 'PATCH',
      body: JSON.stringify({items}),
    },
  );

  return result;
};
