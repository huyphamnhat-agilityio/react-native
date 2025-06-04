import AsyncStorage from '@react-native-async-storage/async-storage';
import {User} from 'src/interfaces';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {immer} from 'zustand/middleware/immer';

export type UserStore = {
  user: Omit<User, 'password'> | undefined;
  currentAddressId: string;
  accessToken: string | undefined;
  isFirstTimeLogin: boolean;
  isHydrated: boolean;
  setUser: (user: Omit<User, 'password'>) => void;
  setAccessToken: (token: string) => void;
  clearUserSession: () => void;
  setHydrated: (state: boolean) => void;
  setCurrentAddressId: (id: string) => void;
};

export const useUserStore = create(
  persist(
    immer<UserStore>(set => ({
      user: undefined,
      accessToken: undefined,
      currentAddressId: '',
      isFirstTimeLogin: true,
      isHydrated: false,
      setUser: (user: Omit<User, 'password'>) =>
        set(state => {
          state.user = user;
        }),
      setAccessToken: (token: string) =>
        set(state => {
          state.accessToken = token;
          state.isFirstTimeLogin = false;
        }),
      setCurrentAddressId: (id: string) =>
        set(state => {
          if (state.currentAddressId === id) {
            state.currentAddressId = '';
          } else {
            state.currentAddressId = id;
          }
        }),
      clearUserSession: () =>
        set(state => {
          state.user = undefined;
          state.accessToken = undefined;
        }),
      setHydrated: (hydrated: boolean) =>
        set(state => {
          state.isHydrated = hydrated;
        }),
    })),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => {
        return () => {
          useUserStore.getState().setHydrated(true);
        };
      },
    },
  ),
);
