import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Screens
import {BoardingScreen, HomeScreen, LoginScreen} from 'src/screens';

// Constants
import {SCREENS} from 'src/constants';

// Interfaces
import {AppStackParamList} from 'src/interfaces';

const AppStack = createNativeStackNavigator<AppStackParamList>();

export const AppStackNavigation = () => {
  return (
    <AppStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <AppStack.Screen name={SCREENS.BOARDING} component={BoardingScreen} />
      <AppStack.Screen name={SCREENS.LOGIN} component={LoginScreen} />
      <AppStack.Screen name={SCREENS.HOME} component={HomeScreen} />
    </AppStack.Navigator>
  );
};
