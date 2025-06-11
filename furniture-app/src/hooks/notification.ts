import {useEffect, useState} from 'react';
import notifee from '@notifee/react-native';
import {navigate} from 'src/navigation/navigationConfig';
import {useUserStore} from 'src/store';

export const useInitialNotifeeNavigation = (isNavigationReady: boolean) => {
  const user = useUserStore(state => state.user);
  const [pendingProductId, setPendingProductId] = useState<string | null>(null);

  useEffect(() => {
    notifee.getInitialNotification().then(notification => {
      const data = notification?.notification?.data;
      if (data?.type === 'ProductDetail' && data?.id) {
        setPendingProductId(data.id as string);
      }
    });
  }, []);

  useEffect(() => {
    if (isNavigationReady && pendingProductId && user) {
      navigate('ProductDetail', {id: pendingProductId});
      setPendingProductId(null);
    }
  }, [isNavigationReady, pendingProductId, user]);
};
