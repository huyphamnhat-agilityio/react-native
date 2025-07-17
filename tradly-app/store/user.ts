import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { User, UserAddress } from "@/interfaces";
import { SecureStorage } from "@/utils";

export type UserStore = {
  user: Omit<User, "password"> | undefined;
  accessToken?: string;
  isFirstTimeLogin: boolean;
  setUser: (user: Omit<User, "password">) => void;
  setAccessToken: (token: string) => void;
  clearUserSession: () => void;
  setUserAvatar: (avatar: string) => void;
  setUserAddress: (address: UserAddress) => void;
};

export const useUserStore = create(
  persist(
    immer<UserStore>((set) => ({
      user: undefined,
      accessToken: undefined,
      currentAddress: undefined,
      isFirstTimeLogin: true,
      setUser: (user: Omit<User, "password">) =>
        set((state) => {
          state.user = user;
        }),
      setAccessToken: (token: string) =>
        set((state) => {
          state.accessToken = token;
          state.isFirstTimeLogin = false;
        }),

      setUserAvatar: (avatar: string) =>
        set((state) => {
          if (state.user) {
            state.user.avatar = avatar;
          }
        }),

      setUserAddress: (address) => {
        set((state) => {
          if (state.user) {
            state.user.address = address;
          }
        });
      },
      clearUserSession: () =>
        set((state) => {
          state.user = undefined;
          state.accessToken = undefined;
        }),
    })),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => SecureStorage),
    },
  ),
);
