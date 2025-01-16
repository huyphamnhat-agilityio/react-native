/* eslint-disable react/no-unstable-nested-components */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ActiveProfileIcon, HomeIcon, ProfileIcon} from 'src/components/icons';
import {HomeTabParamList} from 'src/interfaces/navigation';
import {HomeScreen, ProfileScreen} from 'src/screens';
import {colors} from 'src/themes';

const HomeTab = createBottomTabNavigator<HomeTabParamList>();

const HomeTabs = () => {
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
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </HomeTab.Navigator>
  );
};

export default HomeTabs;
