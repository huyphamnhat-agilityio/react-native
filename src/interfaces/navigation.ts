import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationProp} from '@react-navigation/native';
import {SCREENS} from 'src/constants';

export type AppStackParamList = {
  [SCREENS.BOARDING]: undefined;
  [SCREENS.LOGIN]: undefined;
  [SCREENS.HOME]: undefined;
  [SCREENS.PRODUCT_DETAIL]: {id: string};
  [SCREENS.CART]: undefined;
};

export type AppStackScreenProps<Screen extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, Screen>;

export type StackNavigation = NavigationProp<AppStackParamList>;
