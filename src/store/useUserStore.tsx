import AsyncStorage from '@react-native-async-storage/async-storage';
import {User} from 'src/interfaces';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {immer} from 'zustand/middleware/immer';

export type UserStore = {
  user: User | undefined;
  isFirstTimeLogin: boolean;
  isHydrated: boolean;
  setUser: (user: User) => void;
  clearUserSession: () => void;
  setHydrated: (state: boolean) => void;
};

export const useUserStore = create(
  persist(
    immer<UserStore>(set => ({
      user: undefined,
      isFirstTimeLogin: true,
      isHydrated: false,
      setUser: (user: User) =>
        set(state => {
          state.user = user;
          state.isFirstTimeLogin = false;
        }),
      clearUserSession: () =>
        set(state => {
          state.user = undefined;
        }),
      setHydrated: (hydrated: boolean) =>
        set(state => {
          state.isHydrated = hydrated;
        }),
    })),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => {
        return () => {
          useUserStore.getState().setHydrated(true);
        };
      },
    },
  ),
);
