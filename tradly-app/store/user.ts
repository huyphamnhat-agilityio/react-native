import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { User } from "@/interfaces";
import { SecureStorage } from "@/utils";

export type UserStore = {
  user: Omit<User, "password"> | undefined;
  accessToken?: string;
  isFirstTimeLogin: boolean;
  isHydrated: boolean;
  setUser: (user: Omit<User, "password">) => void;
  setAccessToken: (token: string) => void;
  clearUserSession: () => void;
  setHydrated: (state: boolean) => void;
  setUserAvatar: (avatar: string) => void;
};

export const useUserStore = create(
  persist(
    immer<UserStore>((set, get) => ({
      user: undefined,
      accessToken: undefined,
      currentAddress: undefined,
      isFirstTimeLogin: true,
      isHydrated: false,
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
      clearUserSession: () =>
        set((state) => {
          state.user = undefined;
          state.accessToken = undefined;
        }),
      setHydrated: (hydrated: boolean) =>
        set((state) => {
          state.isHydrated = hydrated;
        }),
    })),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => SecureStorage),
      onRehydrateStorage: () => {
        return () => {
          useUserStore.getState().setHydrated(true);
        };
      },
    },
  ),
);
