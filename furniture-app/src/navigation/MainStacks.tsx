import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { memo, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Constants
import { SCREENS } from 'src/constants';

// Screens
import {
  CartScreen,
  CheckoutScreen,
  ProductDetailScreen,
  SuccessScreen,
} from 'src/screens';

// Icons
import { BackArrowIcon } from 'src/components/icons';

// Components
import { Button } from 'src/components/common';

// Themes
import { colors, fontFamilies, fontSizes } from 'src/themes';

// Types & Interfaces
import { MainStacksParamList } from 'src/interfaces';

import HomeTabs from './HomeTabs';

const MainStack = createNativeStackNavigator<MainStacksParamList>();

const MainStacks = memo(() => {
  const { goBack } = useNavigation();

  const HeaderLeft = useCallback(
    () => (
      <Button
        style={styles.button}
        bgVariant="none"
        IconLeft={<BackArrowIcon />}
        onPress={goBack}
      />
    ),
    [goBack],
  );

  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name={SCREENS.MAIN.HOME_TABS}
        component={HomeTabs}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name={SCREENS.MAIN.PRODUCT_DETAIL}
        component={ProductDetailScreen}
        options={{ headerShown: false }}
      />

      <MainStack.Screen
        name={SCREENS.MAIN.CART}
        component={CartScreen}
        options={{
          title: 'My cart',
          headerShown: true,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: fontSizes.sm,
            fontFamily: fontFamilies.MerriweatherBold,
            color: colors.secondary,
          },
          headerShadowVisible: false,
          headerStyle: { backgroundColor: colors.white },
          headerLeft: HeaderLeft,
        }}
      />

      <MainStack.Screen
        name={SCREENS.MAIN.CHECKOUT}
        component={CheckoutScreen}
        options={{
          title: 'Check out',
          headerShown: true,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: fontSizes.sm,
            fontFamily: fontFamilies.MerriweatherBold,
            color: colors.secondary,
          },
          headerShadowVisible: false,
          headerStyle: { backgroundColor: colors.white },
          headerLeft: HeaderLeft,
        }}
      />

      <MainStack.Screen
        name={SCREENS.MAIN.SUCCESS}
        component={SuccessScreen}
        options={{ headerShown: false }}
      />
    </MainStack.Navigator>
  );
});

const styles = StyleSheet.create({
  button: {
    padding: 0,
  },
});

MainStacks.displayName = 'MainStacks';
export default MainStacks;
