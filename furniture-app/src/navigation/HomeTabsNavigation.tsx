import {memo, useCallback} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import {Alert, StyleSheet} from 'react-native';

// Types & Interfaces
import {HomeTabParamList, StackNavigation} from 'src/interfaces/navigation';

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
import {FavoritesScreen, HomeScreen, ProfileScreen} from 'src/screens';

// Themes
import {colors, fontFamilies, fontSizes} from 'src/themes';

// Components
import {Button} from 'src/components/common';

// Stores
import {useUserStore} from 'src/store';

// Constants
import {SCREENS} from 'src/constants';

const HomeTab = createBottomTabNavigator<HomeTabParamList>();

const HomeTabs = memo(() => {
  const {navigate} = useNavigation<StackNavigation>();

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
      {cancelable: true},
    );
  }, [clearUserSession]);

  const HomeTabBarIconComponent = useCallback(
    ({focused, color}: {focused: boolean; color: string}) => {
      return (
        <HomeIcon fill={focused ? colors.primary : undefined} color={color} />
      );
    },
    [],
  );

  const ProfileTabIconComponent = useCallback(
    ({focused}: {focused: boolean}) => {
      return focused ? <ActiveProfileIcon /> : <ProfileIcon />;
    },
    [],
  );

  const FavoritesTabIconComponent = useCallback(
    ({focused}: {focused: boolean}) => {
      return (
        <MarkIcon
          fill={focused ? colors.primary : 'none'}
          color={focused ? colors.primary : colors.disabled}
        />
      );
    },
    [],
  );

  const handleNavigateToCart = useCallback(() => navigate('Cart'), [navigate]);

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
      initialRouteName={SCREENS.HOME}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarInactiveTintColor: colors.disabled,
        tabBarActiveTintColor: colors.primary,
        tabBarStyle: {
          height: 60,
          paddingTop: 8,
        },
      }}>
      <HomeTab.Screen
        options={{
          tabBarIcon: HomeTabBarIconComponent,
        }}
        name={SCREENS.HOME}
        component={HomeScreen}
      />
      <HomeTab.Screen
        options={{
          tabBarIcon: FavoritesTabIconComponent,
          title: SCREENS.FAVORITES,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: fontSizes.sm,
            fontFamily: fontFamilies.MerriweatherBold,
            color: colors.secondary,
          },
          headerShown: true,
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerRightContainerStyle: {
            alignSelf: 'center',
            paddingRight: 16,
          },
          headerRight: CartButton,
        }}
        name={SCREENS.FAVORITES}
        component={FavoritesScreen}
      />
      <HomeTab.Screen
        options={{
          tabBarIcon: ProfileTabIconComponent,
          title: SCREENS.PROFILE,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: fontSizes.sm,
            fontFamily: fontFamilies.MerriweatherBold,
            color: colors.secondary,
          },
          headerShown: true,
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerRightContainerStyle: {
            alignSelf: 'center',
            paddingRight: 16,
          },
          headerRight: LogoutButton,
        }}
        name={SCREENS.PROFILE}
        component={ProfileScreen}
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
