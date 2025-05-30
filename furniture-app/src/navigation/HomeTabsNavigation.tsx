import {memo, useCallback} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Types & Interfaces
import {Alert, StyleSheet} from 'react-native';
import {HomeTabParamList} from 'src/interfaces/navigation';

// Icons
import {
  ActiveProfileIcon,
  HomeIcon,
  LogoutIcon,
  ProfileIcon,
} from 'src/components/icons';

// Screens
import {HomeScreen, ProfileScreen} from 'src/screens';

// Themes
import {colors, fontFamilies, fontSizes} from 'src/themes';

// Components
import {Button} from 'src/components/common';

// Stores
import {useUserStore} from 'src/store';
import {SCREENS} from 'src/constants';

const HomeTab = createBottomTabNavigator<HomeTabParamList>();

const HomeTabs = memo(() => {
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

  const HeaderRightComponent = useCallback(
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
          headerRight: HeaderRightComponent,
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
  },
});

HomeTabs.displayName = 'HomeTabs';

export default HomeTabs;
