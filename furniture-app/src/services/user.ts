import {fetchApi} from './fetch';
import {QueryParams, User} from 'src/interfaces';
import {RESOURCES} from 'src/constants';
import {toQueryString} from 'src/utils';

export const getUser = async (params?: QueryParams<Pick<User, 'email'>>) => {
  const users = await fetchApi<Array<User>>(
    `${process.env.AUTH_URL}/${RESOURCES.USER}${toQueryString(params)}`,
  );

  return users[0];
};
