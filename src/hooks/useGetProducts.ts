import {useQuery} from '@tanstack/react-query';
import {QUERY_KEY} from 'src/constants';
import {getProducts} from 'src/services';

export const useGetProducts = () =>
  useQuery({
    queryKey: [QUERY_KEY.PRODUCTS],
    queryFn: async () => await getProducts(),
  });
