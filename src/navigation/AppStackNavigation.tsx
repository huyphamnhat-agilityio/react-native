/* eslint-disable react/no-unstable-nested-components */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
// Screens
import {
  BoardingScreen,
  CartScreen,
  HomeScreen,
  LoginScreen,
  ProductDetailScreen,
} from 'src/screens';

// Constants
import {SCREENS} from 'src/constants';

// Types & Interfaces
import {AppStackParamList, StackNavigation} from 'src/interfaces';

// Themes
import {colors} from 'src/themes';

// Icons
import {BackArrowIcon} from 'src/components/icons';

const AppStack = createNativeStackNavigator<AppStackParamList>();

export const AppStackNavigation = () => {
  const {goBack} = useNavigation<StackNavigation>();
  return (
    <AppStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <AppStack.Screen name={SCREENS.BOARDING} component={BoardingScreen} />
      <AppStack.Screen name={SCREENS.LOGIN} component={LoginScreen} />
      <AppStack.Screen name={SCREENS.HOME} component={HomeScreen} />
      <AppStack.Screen
        options={{
          title: 'My cart',
          headerTitleAlign: 'center',
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerLeft: () => <BackArrowIcon onPress={goBack} />,
        }}
        name={SCREENS.CART}
        component={CartScreen}
      />
      <AppStack.Screen
        name={SCREENS.PRODUCT_DETAIL}
        component={ProductDetailScreen}
      />
    </AppStack.Navigator>
  );
};
