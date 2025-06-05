import {fetchApi, fetchApiWithAuth} from './fetch';
import {QueryParams, User} from 'src/interfaces';
import {RESOURCES} from 'src/constants';
import {toQueryString} from 'src/utils';

export const getUser = async (params?: QueryParams<Pick<User, 'email'>>) => {
  const users = await fetchApi<Array<User>>(
    `${process.env.AUTH_URL}/${RESOURCES.USERS}${toQueryString(params)}`,
  );

  return users[0];
};

export const updateUser = async (payload: Partial<User>) => {
  const {id = '', ...rest} = payload;
  await fetchApiWithAuth(`${process.env.API_URL}/${RESOURCES.USERS}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(rest),
  });
};
