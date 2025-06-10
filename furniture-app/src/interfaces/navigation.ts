import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  CompositeScreenProps,
  NavigationProp,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {SCREENS} from 'src/constants';
import {ShippingAddress} from './user';

export type HomeTabParamList = {
  [SCREENS.HOME]: undefined;
  [SCREENS.FAVORITES]: undefined;
  [SCREENS.PROFILE]: undefined;
};

export type AppStackParamList = {
  [SCREENS.BOARDING]: undefined;
  [SCREENS.LOGIN]: undefined;
  [SCREENS.REGISTER]: undefined;
  [SCREENS.HOME_TABS]: NavigatorScreenParams<HomeTabParamList>;
  [SCREENS.PRODUCT_DETAIL]: {id: string};
  [SCREENS.CART]: undefined;
  [SCREENS.CHECKOUT]: {totalMoney: number};
  [SCREENS.SUCCESS]: undefined;
  [SCREENS.SHIPPING_ADDRESS]: undefined;
  [SCREENS.ADD_OR_EDIT_ADDRESS]: {address?: ShippingAddress};
};

export type AppStackScreenProps<Screen extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, Screen>;

export type HomeTabScreenProps<Screen extends keyof HomeTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<HomeTabParamList, Screen>,
    NativeStackScreenProps<AppStackParamList>
  >;

export type StackNavigation = NavigationProp<AppStackParamList>;

export type TabNavigation = NavigationProp<HomeTabParamList>;
