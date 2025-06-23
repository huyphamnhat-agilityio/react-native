import { getPerformance } from '@react-native-firebase/perf';
import { NavigationContainer } from '@react-navigation/native';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { AnimatedBootSplash } from './AnimatedBootSplash';
import { linking, navigationRef } from './navigationConfig';
import { InteractionManager } from 'react-native';
import AppStacks from './AppStacks';

// Store
import { useUserStore } from 'src/store';

// Hooks
import {
  useHandleInitialURL,
  useInitialNotifeeNavigation,
  useInitNotificationListener,
} from 'src/hooks';

const Navigation = memo(() => {
  const [visible, setVisible] = useState(true);

  const [isNavReady, setIsNavReady] = useState(false);

  const isHydrated = useUserStore(state => state.isHydrated);

  useInitialNotifeeNavigation(isNavReady && isHydrated);

  useHandleInitialURL(isNavReady && isHydrated);

  useInitNotificationListener();

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
