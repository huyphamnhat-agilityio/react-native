import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  CompositeScreenProps,
  NavigationProp,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { SCREENS } from 'src/constants';
import { ShippingAddress } from './user';

export type AuthStacksParamList = {
  [SCREENS.AUTH.BOARDING]: undefined;
  [SCREENS.AUTH.LOGIN]: undefined;
  [SCREENS.AUTH.REGISTER]: undefined;
};

export type MainStacksParamList = {
  [SCREENS.MAIN.HOME_TABS]: NavigatorScreenParams<HomeTabsParamList>;
  [SCREENS.MAIN.PRODUCT_DETAIL]: { id: string };
  [SCREENS.MAIN.CART]: undefined;
  [SCREENS.MAIN.CHECKOUT]: { totalMoney: number };
  [SCREENS.MAIN.SUCCESS]: undefined;
};

export type AddressStacksParamList = {
  [SCREENS.ADDRESS.SHIPPING_ADDRESS]: undefined;
  [SCREENS.ADDRESS.ADD_OR_EDIT_ADDRESS]: { address?: ShippingAddress };
};

export type HomeTabsParamList = {
  [SCREENS.TABS.HOME]: undefined;
  [SCREENS.TABS.FAVORITES]: undefined;
  [SCREENS.TABS.PROFILE]: undefined;
};

export type AppStacksParamList = {
  AuthStacks: NavigatorScreenParams<AuthStacksParamList>;
  MainStacks: NavigatorScreenParams<MainStacksParamList>;
  AddressStacks: NavigatorScreenParams<AddressStacksParamList>;
};

export type AuthStacksScreenProps<Screen extends keyof AuthStacksParamList> =
  NativeStackScreenProps<AuthStacksParamList, Screen>;

export type MainStacksScreenProps<Screen extends keyof MainStacksParamList> =
  NativeStackScreenProps<MainStacksParamList, Screen>;

export type AddressStacksScreenProps<
  Screen extends keyof AddressStacksParamList,
> = NativeStackScreenProps<AddressStacksParamList, Screen>;

export type HomeTabsScreenProps<Screen extends keyof HomeTabsParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<HomeTabsParamList, Screen>,
    NativeStackScreenProps<MainStacksParamList>
  >;

export type AppStacksScreenProps<Screen extends keyof AppStacksParamList> =
  NativeStackScreenProps<AppStacksParamList, Screen>;

export type AppNavigation = NavigationProp<AppStacksParamList>;
export type MainNavigation = NavigationProp<MainStacksParamList>;
export type AddressNavigation = NavigationProp<AddressStacksParamList>;
export type TabNavigation = NavigationProp<HomeTabsParamList>;
export type AuthNavigation = NavigationProp<AuthStacksParamList>;
