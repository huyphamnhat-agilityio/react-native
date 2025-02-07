import bcrypt from 'bcryptjs';

// Types & Interfaces
import {UserPayload} from 'src/interfaces';

// Services
import {getUser} from './user';

// Store
import {useUserStore} from 'src/store';

// Constants
import {ERROR_MESSAGE} from 'src/constants';

export const login = async (payload: UserPayload) => {
  try {
    const user = await getUser({email: payload.email});

    const isMatchPassword = bcrypt.compareSync(payload.password, user.password);

    if (!isMatchPassword) {
      throw 404;
    }

    const setUser = useUserStore.getState().setUser;

    setUser(user);

    return undefined;
  } catch (error) {
    if (typeof error === 'number') {
      return ERROR_MESSAGE.LOGIN[`${error}`];
    }
    return ERROR_MESSAGE.LOGIN['500'];
  }
};
