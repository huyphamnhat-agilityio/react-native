import { getPerformance } from '@react-native-firebase/perf';
import { NavigationContainer } from '@react-navigation/native';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { AnimatedBootSplash } from './AnimatedBootSplash';
import { linking, navigate, navigationRef } from './navigationConfig';
import notifee, { EventType } from '@notifee/react-native';
import { getMessaging } from '@react-native-firebase/messaging';
import { InteractionManager } from 'react-native';
import AppStacks from './AppStacks';

// Store
import { useUserStore } from 'src/store';

// Hooks
import { useHandleInitialURL, useInitialNotifeeNavigation } from 'src/hooks';

// Services
import { onMessageReceived, onRegisterFirebaseMessaging } from 'src/services';

// Constants
import { SCREENS } from 'src/constants';

const Navigation = memo(() => {
  const [visible, setVisible] = useState(true);

  const [isNavReady, setIsNavReady] = useState(false);

  const isHydrated = useUserStore(state => state.isHydrated);

  useInitialNotifeeNavigation(isNavReady && isHydrated);

  useHandleInitialURL(isNavReady && isHydrated);

  const routeNameRef = useRef<string | undefined>(undefined);

  const handleStateChange = async () => {
    const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;

    if (!currentRouteName || routeNameRef.current === currentRouteName) {
      return;
    }

    const trace = getPerformance().newTrace(
      `${currentRouteName}_initial_render`,
    );

    await trace.start();

    InteractionManager.runAfterInteractions(() => {
      trace.stop();
    });

    routeNameRef.current = currentRouteName;
  };

  const handleReady = useCallback(() => {
    if (isHydrated) {
      setVisible(false);
    }
    setIsNavReady(true);
    routeNameRef.current =
      navigationRef.current?.getCurrentRoute?.()?.name ?? undefined;
  }, [isHydrated]);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }
  }, [isHydrated]);

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

  return (
    <NavigationContainer
      linking={linking}
      ref={navigationRef}
      onReady={handleReady}
      onStateChange={handleStateChange}
    >
      <AppStacks />
      {visible && <AnimatedBootSplash onAnimationEnd={handleReady} />}
    </NavigationContainer>
  );
});

Navigation.displayName = 'Navigation';

export default Navigation;
