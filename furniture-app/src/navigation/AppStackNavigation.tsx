import {memo, useCallback} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {useShallow} from 'zustand/shallow';
import HomeTabs from './HomeTabsNavigation';

// Screens
import {
  BoardingScreen,
  CartScreen,
  CheckoutScreen,
  LoginScreen,
  ProductDetailScreen,
  RegisterScreen,
  SuccessScreen,
} from 'src/screens';

// Constants
import {SCREENS} from 'src/constants';

// Types & Interfaces
import {AppStackParamList, StackNavigation} from 'src/interfaces';

// Themes
import {colors, fontFamilies, fontSizes} from 'src/themes';

// Icons
import {BackArrowIcon} from 'src/components/icons';

// Store
import {useUserStore} from 'src/store';

// Components
import {Button} from 'src/components/common';

const AppStack = createNativeStackNavigator<AppStackParamList>();

const AppStackNavigation = memo(() => {
  const {goBack} = useNavigation<StackNavigation>();

  const {accessToken, isFirstTimeLogin, isHydrated} = useUserStore(
    useShallow(state => ({
      accessToken: state.accessToken,
      isFirstTimeLogin: state.isFirstTimeLogin,
      isHydrated: state.isHydrated,
    })),
  );

  const HeaderLeftComponent = useCallback(
    () => (
      <Button
        style={styles.button}
        bgVariant="none"
        IconLeft={<BackArrowIcon />}
        onPress={goBack}
        onPressIn={goBack}
      />
    ),
    [goBack],
  );

  if (!isHydrated) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <AppStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {accessToken ? (
        <>
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
              headerLeft: HeaderLeftComponent,
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
              headerLeft: HeaderLeftComponent,
            }}
            name={SCREENS.CHECKOUT}
            component={CheckoutScreen}
          />
          <AppStack.Screen name={SCREENS.SUCCESS} component={SuccessScreen} />
        </>
      ) : (
        <>
          {isFirstTimeLogin && (
            <AppStack.Screen
              name={SCREENS.BOARDING}
              component={BoardingScreen}
            />
          )}
          <AppStack.Screen name={SCREENS.LOGIN} component={LoginScreen} />
          <AppStack.Screen name={SCREENS.REGISTER} component={RegisterScreen} />
        </>
      )}
    </AppStack.Navigator>
  );
});

const styles = StyleSheet.create({
  button: {
    padding: 0,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

AppStackNavigation.displayName = 'AppStackNavigation';

export default AppStackNavigation;
