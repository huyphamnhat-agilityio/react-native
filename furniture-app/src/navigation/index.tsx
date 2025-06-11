import {NavigationContainer} from '@react-navigation/native';
import AppStackNavigation from './AppStackNavigation';
import {memo, useCallback, useEffect, useState} from 'react';
import {AnimatedBootSplash} from './AnimatedBootSplash';
import {useUserStore} from 'src/store';

const Navigation = memo(() => {
  const [visible, setVisible] = useState(true);

  const isHydrated = useUserStore(state => state.isHydrated);

  const handleReady = useCallback(() => {
    if (isHydrated) {
      setVisible(false);
    }
  }, [isHydrated]);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }
  }, [isHydrated]);

  return (
    <NavigationContainer onReady={handleReady}>
      <AppStackNavigation />
      {visible && <AnimatedBootSplash onAnimationEnd={handleReady} />}
    </NavigationContainer>
  );
});

Navigation.displayName = 'Navigation';

export default Navigation;
