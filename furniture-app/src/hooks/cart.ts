import {useMutation, useQuery} from '@tanstack/react-query';
import {QUERY_KEY} from 'src/constants';
import {Cart, QueryParams} from 'src/interfaces';
import {createCart, getCart, updateCart} from 'src/services';

export const useGetCart = (params?: QueryParams<Pick<Cart, 'userId' | 'id'>>) =>
  useQuery({
    queryKey: QUERY_KEY.CARTS(params),
    queryFn: getCart,
  });

export const useUpdateCart = () =>
  useMutation({
    mutationFn: updateCart,
  });

export const useCreateCart = () =>
  useMutation({
    mutationFn: createCart,
  });
