import { useEffect } from 'react';
import notifee from '@notifee/react-native';
import { navigate } from 'src/navigation/navigationConfig';
import { useUserStore } from 'src/store';
import { SCREENS, STACKS } from 'src/constants';

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
