import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { memo, useCallback } from 'react';

// Constants
import { SCREENS } from 'src/constants';

// Screens
import { AddOrEditAddressScreen, ShippingAddressScreen } from 'src/screens';

// Icons
import { BackArrowIcon } from 'src/components/icons';

// Components
import { Button } from 'src/components/common';

// Themes
import { colors, fontFamilies, fontSizes } from 'src/themes';

// Types & Interfaces
import { AddressStacksParamList } from 'src/interfaces';

const AddressStack = createNativeStackNavigator<AddressStacksParamList>();

const AddressStacks = memo(() => {
  const HeaderLeft = useCallback(
    (navigation: any) => (
      <Button
        style={styles.button}
        bgVariant="none"
        IconLeft={<BackArrowIcon />}
        onPress={navigation.goBack}
      />
    ),
    [],
  );

  return (
    <AddressStack.Navigator>
      <AddressStack.Screen
        name={SCREENS.ADDRESS.SHIPPING_ADDRESS}
        component={ShippingAddressScreen}
        options={({ navigation }) => ({
          title: 'Shipping Address',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: fontSizes.sm,
            fontFamily: fontFamilies.MerriweatherBold,
            color: colors.secondary,
          },
          headerShadowVisible: false,
          headerStyle: { backgroundColor: colors.white },
          headerLeft: () => HeaderLeft(navigation),
        })}
      />

      <AddressStack.Screen
        name={SCREENS.ADDRESS.ADD_OR_EDIT_ADDRESS}
        component={AddOrEditAddressScreen}
        options={({ route, navigation }) => ({
          title: route.params?.address
            ? 'Edit Shipping Address'
            : 'Add Shipping Address',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: fontSizes.sm,
            fontFamily: fontFamilies.MerriweatherBold,
            color: colors.secondary,
          },
          headerShadowVisible: false,
          headerStyle: { backgroundColor: colors.white },
          headerLeft: () => HeaderLeft(navigation),
        })}
      />
    </AddressStack.Navigator>
  );
});

const styles = StyleSheet.create({
  button: {
    padding: 0,
  },
});

AddressStacks.displayName = 'AddressStacks';
export default AddressStacks;
