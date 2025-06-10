import {QueryFunctionContext} from '@tanstack/react-query';
import {fetchApiWithAuth} from './fetch';

// Types & Interfaces
import {Favorites, FavoritesPayload} from 'src/interfaces';

// Constants
import {QUERY_KEY, RESOURCES} from 'src/constants';

export const createFavorites = async (userId: string) => {
  const payload: FavoritesPayload = {
    userId,
    items: [],
  };

  await fetchApiWithAuth(`${process.env.API_URL}/${RESOURCES.FAVORITES}`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
};

export const getFavorites = async ({
  queryKey: [{params}],
}: QueryFunctionContext<ReturnType<(typeof QUERY_KEY)['FAVORITES']>>) => {
  const result = await fetchApiWithAuth<Favorites>(
    `${process.env.API_URL}/${RESOURCES.FAVORITES}${
      params?.id ? `/${params.id}` : ''
    }`,
  );

  return result;
};

export const updateFavorites = async (payload: Omit<Favorites, 'id'>) => {
  const {userId, items} = payload;
  await fetchApiWithAuth<Favorites>(
    `${process.env.API_URL}/${RESOURCES.FAVORITES}/${userId}`,
    {
      method: 'PATCH',
      body: JSON.stringify({items}),
    },
  );
};
