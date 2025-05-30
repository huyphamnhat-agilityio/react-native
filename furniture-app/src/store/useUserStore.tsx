import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {immer} from 'zustand/middleware/immer';

export type UserStore = {
  accessToken: string | undefined;
  isFirstTimeLogin: boolean;
  isHydrated: boolean;
  setAccessToken: (accessToken: string) => void;
  clearUserSession: () => void;
  setHydrated: (state: boolean) => void;
};

export const useUserStore = create(
  persist(
    immer<UserStore>(set => ({
      accessToken: undefined,
      isFirstTimeLogin: true,
      isHydrated: false,
      setAccessToken: (accessToken: string) =>
        set(state => {
          state.accessToken = accessToken;
          state.isFirstTimeLogin = false;
        }),
      clearUserSession: () =>
        set(state => {
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
