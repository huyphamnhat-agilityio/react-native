import AsyncStorage from '@react-native-async-storage/async-storage';
import {ShippingAddress, User} from 'src/interfaces';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {immer} from 'zustand/middleware/immer';

export type UserStore = {
  user: Omit<User, 'password'> | undefined;
  currentAddress: ShippingAddress | undefined;
  accessToken: string | undefined;
  isFirstTimeLogin: boolean;
  isHydrated: boolean;
  setUser: (user: Omit<User, 'password'>) => void;
  setAccessToken: (token: string) => void;
  clearUserSession: () => void;
  setHydrated: (state: boolean) => void;
  setCurrentAddress: (address: ShippingAddress) => void;
  setUserAddress: (address: ShippingAddress[]) => void;
};

export const useUserStore = create(
  persist(
    immer<UserStore>((set, get) => ({
      user: undefined,
      accessToken: undefined,
      currentAddress: undefined,
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
      setCurrentAddress: (address: ShippingAddress) =>
        set(state => {
          const isCurrentAddress = state.currentAddress?.id === address.id;

          if (isCurrentAddress) {
            state.currentAddress = undefined;
          } else {
            state.currentAddress = address;
          }
        }),
      getCurrentAddress: (id: string) => {
        return (
          get().user?.shippingAddress.find(address => address.id === id) ||
          ({} as ShippingAddress)
        );
      },
      setUserAddress: (address: ShippingAddress[]) => {
        set(state => {
          if (state.user) {
            state.user.shippingAddress = address;
          }
        });
      },
      clearUserSession: () =>
        set(state => {
          state.user = undefined;
          state.accessToken = undefined;
          state.currentAddress = undefined;
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
