import { useState, useEffect, useRef } from "react";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

import Constants from "expo-constants";

import { Platform } from "react-native";
import { colors } from "@/themes";
import { handleNeverAskAgain } from "@/utils";
import { Href, router } from "expo-router";
import { useNotificationStore } from "@/store";
import { useShallow } from "zustand/shallow";

export interface PushNotificationState {
  expoPushToken?: Notifications.ExpoPushToken;
  notification?: Notifications.Notification;
}

export const useInitPushNotifications = (): PushNotificationState => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: true,
      shouldSetBadge: true,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });

  const [expoPushToken, setExpoPushToken] = useState<
    Notifications.ExpoPushToken | undefined
  >();

  const setNotificationGlobal = useNotificationStore(
    (state) => state.setNotification,
  );

  const responseListener = useRef<Notifications.EventSubscription>(null);

  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        handleNeverAskAgain("Notifications");
      }

      try {
        token = await Notifications.getExpoPushTokenAsync({
          projectId: Constants.expoConfig?.extra?.eas.projectId,
        });
      } catch (error) {
        console.log("Error while getting token:", error);
      }

      console.log("expoPushToken:", token);
    } else {
      console.log("Must be using a physical device for Push notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: colors.danger,
      });
    }

    return token;
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token);
    });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        setNotificationGlobal(response.notification);
      });

    return () => {
      responseListener.current?.remove();
    };
  }, [setNotificationGlobal]);

  return {
    expoPushToken,
  };
};

export const useNotificationObserver = () => {
  const { notification, setNotification } = useNotificationStore(
    useShallow((state) => ({
      notification: state.notification,
      setNotification: state.setNotification,
    })),
  );

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        setNotification(response.notification);
      },
    );

    return () => {
      subscription.remove();
    };
  }, [setNotification]);

  useEffect(() => {
    if (notification) {
      setNotification(undefined);
      redirect(notification);
    }
  });
};

function redirect(notification: Notifications.Notification) {
  const url = notification.request.content.data?.url as Href;
  if (url) {
    router.push(url);
  }
}
