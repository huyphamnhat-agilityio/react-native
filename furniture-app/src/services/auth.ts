// Types & Interfaces
import {AuthResponse, UserPayload} from 'src/interfaces';

// Store
import {useUserStore} from 'src/store';

// Constants
import {RESOURCES} from 'src/constants';
import {fetchApi} from './fetch';
import {createCart} from './cart';

export const login = async (payload: Omit<UserPayload, 'name'>) => {
  try {
    const authCredential = await fetchApi<AuthResponse>(
      `${process.env.API_URL}/${RESOURCES.LOGIN}`,
      {
        method: 'POST',
        body: JSON.stringify(payload),
      },
    );

    const {
      user: {id, email, name, shippingAddress},
      accessToken,
    } = authCredential;

    const setUser = useUserStore.getState().setUser;
    const setAccessToken = useUserStore.getState().setAccessToken;

    setUser({
      id,
      email,
      name,
      shippingAddress,
    });

    setAccessToken(accessToken);

    return undefined;
  } catch (error) {
    return error as string;
  }
};

export const register = async (payload: UserPayload) => {
  try {
    const authCredential = await fetchApi<AuthResponse>(
      `${process.env.API_URL}/${RESOURCES.REGISTER}`,
      {
        method: 'POST',
        body: JSON.stringify(payload),
      },
    );

    const {
      user: {id, email, name, shippingAddress},
      accessToken,
    } = authCredential;

    const setUser = useUserStore.getState().setUser;
    const setAccessToken = useUserStore.getState().setAccessToken;

    setUser({
      id,
      email,
      name,
      shippingAddress,
    });

    setAccessToken(accessToken);

    await createCart(id);

    return undefined;
  } catch (error) {
    return error as string;
  }
};
