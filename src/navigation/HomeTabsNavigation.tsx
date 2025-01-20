/* eslint-disable react/no-unstable-nested-components */
import {useCallback} from 'react';
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

const HomeTab = createBottomTabNavigator<HomeTabParamList>();

const HomeTabs = () => {
  const handleLogoutPress = useCallback(() => {
    Alert.alert('Log out', 'You will be returned to the login screen.', [
      {text: 'Log out'},
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
  }, []);
  return (
    <HomeTab.Navigator
      initialRouteName="Home"
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
          tabBarIcon: ({focused, color}) => {
            return (
              <HomeIcon
                fill={focused ? colors.primary : undefined}
                color={color}
              />
            );
          },
        }}
        name="Home"
        component={HomeScreen}
      />
      <HomeTab.Screen
        options={{
          tabBarIcon: ({focused}) => {
            return focused ? <ActiveProfileIcon /> : <ProfileIcon />;
          },
          title: 'Profile',
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
          headerRight: () => (
            <Button
              style={styles.button}
              bgVariant="none"
              IconLeft={<LogoutIcon />}
              onPress={handleLogoutPress}
            />
          ),
          headerRightContainerStyle: {
            alignSelf: 'center',
            paddingRight: 16,
          },
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </HomeTab.Navigator>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 0,
  },
});
export default HomeTabs;
