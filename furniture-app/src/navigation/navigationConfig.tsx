import {createNavigationContainerRef} from '@react-navigation/native';
import {SCREENS} from 'src/constants';
import {AppStackParamList} from 'src/interfaces';

export const linking = {
  prefixes: ['myapp://'],
  config: {
    screens: {
      [SCREENS.PRODUCT_DETAIL]: `${SCREENS.PRODUCT_DETAIL}/:id`,
    },
  },
};

export const navigationRef = createNavigationContainerRef<AppStackParamList>();

export function navigate(name: keyof AppStackParamList, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}
