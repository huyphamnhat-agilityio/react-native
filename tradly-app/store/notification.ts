import { Notification } from "expo-notifications";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type NotificationStore = {
  notification?: Notification;
  setNotification: (data: Notification | undefined) => void;
};

export const useNotificationStore = create(
  immer<NotificationStore>((set) => ({
    notification: undefined,
    setNotification: (data) =>
      set((state) => {
        state.notification = data;
      }),
  })),
);
