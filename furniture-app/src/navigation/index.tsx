import {NavigationContainer} from '@react-navigation/native';
import {memo, useCallback, useEffect, useState} from 'react';
import AppStackNavigation from './AppStackNavigation';
import {AnimatedBootSplash} from './AnimatedBootSplash';
import {linking, navigate, navigationRef} from './navigationConfig';
import notifee, {EventType} from '@notifee/react-native';
import {getMessaging} from '@react-native-firebase/messaging';

// Store
import {useUserStore} from 'src/store';

// Hooks
import {useInitialNotifeeNavigation} from 'src/hooks';

// Services
import {onMessageReceived, onRegisterFirebaseMessaging} from 'src/services';

const Navigation = memo(() => {
  const [visible, setVisible] = useState(true);

  const [isNavReady, setIsNavReady] = useState(false);

  const isHydrated = useUserStore(state => state.isHydrated);

  useInitialNotifeeNavigation(isNavReady && isHydrated);

  const handleReady = useCallback(() => {
    if (isHydrated) {
      setVisible(false);
    }
    setIsNavReady(true);
  }, [isHydrated]);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }
  }, [isHydrated]);

  useEffect(() => {
    notifee.onForegroundEvent(({type, detail}) => {
      if (
        type === EventType.PRESS &&
        detail.notification?.data?.type === 'ProductDetail'
      ) {
        const id = detail.notification.data.id;

        navigate('ProductDetail', {id});
      }
    });

    (async () => {
      await onRegisterFirebaseMessaging();
    })();

    const unsubscribeForegroundMessage =
      getMessaging().onMessage(onMessageReceived);

    getMessaging().setBackgroundMessageHandler(onMessageReceived);

    return () => {
      unsubscribeForegroundMessage();
    };
  }, []);

  return (
    <NavigationContainer
      linking={linking}
      ref={navigationRef}
      onReady={handleReady}>
      <AppStackNavigation />
      {visible && <AnimatedBootSplash onAnimationEnd={handleReady} />}
    </NavigationContainer>
  );
});

Navigation.displayName = 'Navigation';

export default Navigation;
