/* eslint-disable react/no-unstable-nested-components */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
// Screens
import {
  BoardingScreen,
  CartScreen,
  CheckoutScreen,
  LoginScreen,
  ProductDetailScreen,
} from 'src/screens';

// Constants
import {SCREENS} from 'src/constants';

// Types & Interfaces
import {AppStackParamList, StackNavigation} from 'src/interfaces';

// Themes
import {colors, fontFamilies, fontSizes} from 'src/themes';

// Icons
import {BackArrowIcon} from 'src/components/icons';
import SuccessScreen from 'src/screens/Success';
import HomeTabs from './HomeTabsNavigation';
import {Button} from 'src/components/common';
import {StyleSheet} from 'react-native';

const AppStack = createNativeStackNavigator<AppStackParamList>();

export const AppStackNavigation = () => {
  const {goBack} = useNavigation<StackNavigation>();
  return (
    <AppStack.Navigator
      initialRouteName="HomeTabs"
      screenOptions={{
        headerShown: false,
      }}>
      <AppStack.Screen name={SCREENS.BOARDING} component={BoardingScreen} />
      <AppStack.Screen name={SCREENS.LOGIN} component={LoginScreen} />
      <AppStack.Screen name={SCREENS.HOME_TABS} component={HomeTabs} />
      <AppStack.Screen
        name={SCREENS.PRODUCT_DETAIL}
        component={ProductDetailScreen}
      />
      <AppStack.Screen
        options={{
          title: 'My cart',
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
          headerLeft: () => (
            <Button
              style={styles.button}
              bgVariant="none"
              IconLeft={<BackArrowIcon />}
              onPress={goBack}
            />
          ),
        }}
        name={SCREENS.CART}
        component={CartScreen}
      />
      <AppStack.Screen
        options={{
          title: 'Check out',
          headerTitleAlign: 'center',
          headerShown: true,
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerLeft: () => (
            <Button
              style={styles.button}
              bgVariant="none"
              IconLeft={<BackArrowIcon />}
              onPress={goBack}
            />
          ),
        }}
        name={SCREENS.CHECKOUT}
        component={CheckoutScreen}
      />
      <AppStack.Screen name={SCREENS.SUCCESS} component={SuccessScreen} />
    </AppStack.Navigator>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 0,
  },
});
