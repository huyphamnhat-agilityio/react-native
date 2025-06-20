import { createNavigationContainerRef } from '@react-navigation/native';
import { SCREENS } from 'src/constants';
import { MainStacksParamList } from 'src/interfaces';

export const linking = {
  prefixes: ['myapp://'],
  config: {
    screens: {
      [SCREENS.MAIN.PRODUCT_DETAIL]: `${SCREENS.MAIN.PRODUCT_DETAIL}/:id`,
    },
  },
};

export const navigationRef =
  createNavigationContainerRef<MainStacksParamList>();

export function navigate(name: keyof MainStacksParamList, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}
