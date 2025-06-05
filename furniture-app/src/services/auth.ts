import {fetchApi} from './fetch';
// Types & Interfaces
import {AuthResponse, UserPayload} from 'src/interfaces';

// Constants
import {RESOURCES} from 'src/constants';

export const login = async (
  payload: Omit<UserPayload, 'name' | 'shippingAddress'>,
) => {
  const authCredential = await fetchApi<AuthResponse>(
    `${process.env.API_URL}/${RESOURCES.LOGIN}`,
    {
      method: 'POST',
      body: JSON.stringify(payload),
    },
  );

  return authCredential;
};

export const register = async (payload: UserPayload) => {
  const authCredential = await fetchApi<AuthResponse>(
    `${process.env.API_URL}/${RESOURCES.REGISTER}`,
    {
      method: 'POST',
      body: JSON.stringify(payload),
    },
  );

  return authCredential;
};
