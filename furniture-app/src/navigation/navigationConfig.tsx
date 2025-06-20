import {
  createNavigationContainerRef,
  LinkingOptions,
} from '@react-navigation/native';
import { SCREENS } from 'src/constants';
import { AppStacksParamList } from 'src/interfaces';

export const linking: LinkingOptions<AppStacksParamList> = {
  prefixes: ['myapp://'],
  config: {
    screens: {
      MainStacks: {
        screens: {
          ProductDetail: `${SCREENS.MAIN.PRODUCT_DETAIL}/:id`,
        },
      },
    },
  },
};

export const navigationRef = createNavigationContainerRef<AppStacksParamList>();

export function navigate(name: keyof AppStacksParamList, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}
