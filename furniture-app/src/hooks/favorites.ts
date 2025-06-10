import {useMutation, useQuery} from '@tanstack/react-query';
import {QUERY_KEY} from 'src/constants';
import {Favorites, QueryParams} from 'src/interfaces';
import {createFavorites} from 'src/services';
import {getFavorites, updateFavorites} from 'src/services/favorites';

export const useGetFavorites = (
  params?: QueryParams<Pick<Favorites, 'userId' | 'id'>>,
) =>
  useQuery({
    queryKey: QUERY_KEY.FAVORITES(params),
    queryFn: getFavorites,
  });

export const useCreateFavorites = () =>
  useMutation({
    mutationFn: createFavorites,
  });

export const useUpdateFavorites = () =>
  useMutation({
    mutationFn: updateFavorites,
  });
