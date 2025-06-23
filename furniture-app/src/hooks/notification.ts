import { getMessaging } from '@react-native-firebase/messaging';
import { useEffect } from 'react';
import notifee, { EventType } from '@notifee/react-native';
import { navigate } from 'src/navigation/navigationConfig';
import { useUserStore } from 'src/store';
import { SCREENS, STACKS } from 'src/constants';
import { onMessageReceived, onRegisterFirebaseMessaging } from 'src/services';

export const useInitialNotifeeNavigation = (isNavigationReady: boolean) => {
  const accessToken = useUserStore(state => state.accessToken);

  useEffect(() => {
    notifee.getInitialNotification().then(notification => {
      const data = notification?.notification?.data;
      if (data?.type === SCREENS.MAIN.PRODUCT_DETAIL && data?.id) {
        isNavigationReady &&
          accessToken &&
          navigate(STACKS.MAIN_STACKS, {
            screen: SCREENS.MAIN.PRODUCT_DETAIL,
            params: { id: data.id },
          });
      }
    });
  }, [isNavigationReady, accessToken]);
};

export const useInitNotificationListener = () => {
  useEffect(() => {
    (async () => {
      await notifee.requestPermission();
    })();

    notifee.onForegroundEvent(async ({ type, detail }) => {
      if (
        type === EventType.PRESS &&
        detail.notification?.data?.type === 'ProductDetail'
      ) {
        const id = detail.notification.data.id;

        navigate('MainStacks', {
          screen: SCREENS.MAIN.PRODUCT_DETAIL,
          params: { id },
        });
      }
    });

    notifee.onBackgroundEvent(async ({ type, detail }) => {
      if (
        type === EventType.PRESS &&
        detail.notification?.data?.type === 'ProductDetail'
      ) {
        const id = detail.notification.data.id;

        navigate('MainStacks', {
          screen: SCREENS.MAIN.PRODUCT_DETAIL,
          params: { id },
        });
      }
    });

    (async () => {
      await onRegisterFirebaseMessaging();
    })();

    const unsubscribeForegroundMessage =
      getMessaging().onMessage(onMessageReceived);

    return () => {
      unsubscribeForegroundMessage();
    };
  }, []);
};
