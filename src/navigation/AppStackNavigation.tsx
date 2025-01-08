import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Screens
import {BoardingScreen} from 'src/screens';

// Constants
import {SCREENS} from 'src/constants';

// Interfaces
import {AppStackParamList} from 'src/interfaces';

const AppStack = createNativeStackNavigator<AppStackParamList>();

export const AppStackNavigation = () => {
  return (
    <AppStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <AppStack.Screen name={SCREENS.BOARDING} component={BoardingScreen} />
    </AppStack.Navigator>
  );
};
