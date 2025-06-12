import {getPerformance} from '@react-native-firebase/perf';
import {NavigationContainer} from '@react-navigation/native';
import {memo, useCallback, useEffect, useRef, useState} from 'react';
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
import {InteractionManager} from 'react-native';

const Navigation = memo(() => {
  const [visible, setVisible] = useState(true);

  const [isNavReady, setIsNavReady] = useState(false);

  const isHydrated = useUserStore(state => state.isHydrated);

  useInitialNotifeeNavigation(isNavReady && isHydrated);

  const routeNameRef = useRef<string | undefined>();

  const handleStateChange = async () => {
    const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;

    if (!currentRouteName || routeNameRef.current === currentRouteName) {
      return;
    }

    // Start new trace
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
      onReady={handleReady}
      onStateChange={handleStateChange}>
      <AppStackNavigation />
      {visible && <AnimatedBootSplash onAnimationEnd={handleReady} />}
    </NavigationContainer>
  );
});

Navigation.displayName = 'Navigation';

export default Navigation;
