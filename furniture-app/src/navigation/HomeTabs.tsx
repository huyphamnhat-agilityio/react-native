import { memo, useCallback } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { Alert, StyleSheet } from 'react-native';

// Types & Interfaces

// Icons
import {
  ActiveProfileIcon,
  CartIcon,
  HomeIcon,
  LogoutIcon,
  MarkIcon,
  ProfileIcon,
} from 'src/components/icons';

// Screens
import { FavoritesScreen, HomeScreen, ProfileScreen } from 'src/screens';

// Themes
import { colors, fontFamilies, fontSizes } from 'src/themes';

// Components
import { Button } from 'src/components/common';

// Stores
import { useUserStore } from 'src/store';

// Constants
import { SCREENS } from 'src/constants';

// Types & Interfaces
import { HomeTabsParamList, MainNavigation } from 'src/interfaces';

const HomeTab = createBottomTabNavigator<HomeTabsParamList>();

const HomeTabs = memo(() => {
  const { navigate } = useNavigation<MainNavigation>();

  const clearUserSession = useUserStore(state => state.clearUserSession);

  const handleLogoutPress = useCallback(() => {
    Alert.alert(
      'Log out',
      'You will be returned to the login screen.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => clearUserSession(),
        },
      ],
      { cancelable: true },
    );
  }, [clearUserSession]);

  const HomeTabBarIconComponent = useCallback(
    ({ focused, color }: { focused: boolean; color: string }) => {
      return (
        <HomeIcon fill={focused ? colors.primary : undefined} color={color} />
      );
    },
    [],
  );

  const ProfileTabIconComponent = useCallback(
    ({ focused }: { focused: boolean }) => {
      return focused ? <ActiveProfileIcon /> : <ProfileIcon />;
    },
    [],
  );

  const FavoritesTabIconComponent = useCallback(
    ({ focused }: { focused: boolean }) => {
      return (
        <MarkIcon
          fill={focused ? colors.primary : 'none'}
          color={focused ? colors.primary : colors.disabled}
        />
      );
    },
    [],
  );

  const handleNavigateToCart = useCallback(
    () => navigate(SCREENS.MAIN.CART),
    [navigate],
  );

  const LogoutButton = useCallback(
    () => (
      <Button
        style={styles.button}
        bgVariant="none"
        IconLeft={<LogoutIcon />}
        onPress={handleLogoutPress}
      />
    ),
    [handleLogoutPress],
  );

  const CartButton = useCallback(
    () => (
      <Button
        style={styles.button}
        bgVariant="none"
        IconLeft={<CartIcon />}
        onPress={handleNavigateToCart}
      />
    ),
    [handleNavigateToCart],
  );
  return (
    <HomeTab.Navigator
      initialRouteName={SCREENS.TABS.HOME}
      screenOptions={{
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: fontSizes.sm,
          fontFamily: fontFamilies.MerriweatherBold,
          color: colors.secondary,
        },
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: colors.white,
        },
        headerRightContainerStyle: {
          alignSelf: 'center',
          paddingRight: 16,
        },
        headerShown: false,
        tabBarShowLabel: false,
        tabBarInactiveTintColor: colors.disabled,
        tabBarActiveTintColor: colors.primary,
        tabBarStyle: {
          height: 60,
          paddingTop: 8,
        },
      }}
    >
      <HomeTab.Screen
        name={SCREENS.TABS.HOME}
        component={HomeScreen}
        options={{
          tabBarIcon: HomeTabBarIconComponent,
          headerShown: false,
        }}
      />
      <HomeTab.Screen
        name={SCREENS.TABS.FAVORITES}
        component={FavoritesScreen}
        options={{
          tabBarIcon: FavoritesTabIconComponent,
          title: SCREENS.TABS.FAVORITES,
          headerShown: true,
          headerRight: CartButton,
        }}
      />
      <HomeTab.Screen
        name={SCREENS.TABS.PROFILE}
        component={ProfileScreen}
        options={{
          tabBarIcon: ProfileTabIconComponent,
          title: SCREENS.TABS.PROFILE,
          headerShown: true,
          headerRight: LogoutButton,
        }}
      />
    </HomeTab.Navigator>
  );
});

const styles = StyleSheet.create({
  button: {
    padding: 0,
    marginVertical: 'auto',
  },
});

HomeTabs.displayName = 'HomeTabs';

export default HomeTabs;
