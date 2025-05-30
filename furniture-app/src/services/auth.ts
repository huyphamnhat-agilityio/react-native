// Types & Interfaces
import {AuthResponse, UserPayload} from 'src/interfaces';

// Store
import {useUserStore} from 'src/store';

// Constants
import {ERROR_MESSAGE, RESOURCES} from 'src/constants';
import {fetchApi} from './fetch';

export const login = async (payload: UserPayload) => {
  try {
    const authCredential = await fetchApi<AuthResponse>(
      `${process.env.API_URL}/${RESOURCES.LOGIN}`,
      {
        method: 'POST',
        body: JSON.stringify(payload),
      },
    );

    const setToken = useUserStore.getState().setAccessToken;

    setToken(authCredential.accessToken);

    return undefined;
  } catch (error) {
    if (typeof error === 'number') {
      return ERROR_MESSAGE.LOGIN[`${error}`];
    }
    return ERROR_MESSAGE.LOGIN['500'];
  }
};
