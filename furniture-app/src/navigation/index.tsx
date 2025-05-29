import {NavigationContainer} from '@react-navigation/native';

import AppStackNavigation from './AppStackNavigation';
import {memo} from 'react';

const Navigation = memo(() => {
  return (
    <NavigationContainer>
      <AppStackNavigation />
    </NavigationContainer>
  );
});

Navigation.displayName = 'Navigation';

export default Navigation;
