import {memo, useCallback} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useShallow} from 'zustand/shallow';

// Components
import {Button} from 'src/components/common';
import {
  DeliveryMethodCard,
  PaymentCard,
  ShippingAddressCard,
  TotalCard,
} from 'src/components';

// Themes
import {colors} from 'src/themes';

// Store
import {useCartStore} from 'src/store';

// Types & Interfaces
import {StackNavigation} from 'src/interfaces';

export type CheckoutScreenProps = {
  navigation: StackNavigation;
};

const CheckoutScreen = memo(({navigation: {reset}}: CheckoutScreenProps) => {
  const {getTotalMoney, clearCart} = useCartStore(
    useShallow(state => ({
      getTotalMoney: state.getTotalMoney,
      clearCart: state.clearCart,
    })),
  );

  const totalMoney = getTotalMoney();

  const handleCheckoutPress = useCallback(() => {
    clearCart();

    reset({
      index: 1,
      routes: [{name: 'HomeTabs'}, {name: 'Success'}],
    });
  }, [clearCart, reset]);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.wrapper}>
        <ShippingAddressCard
          name="Bruno Fernandes"
          address="25 rue Robert Latouche, Nice, 06200, Côte D’azur, France"
        />

        <PaymentCard number="**** **** **** 3947" />

        <DeliveryMethodCard />

        <TotalCard order={totalMoney} delivery={5} />

        <Button
          width="100%"
          title="SUBMIT ORDER"
          titleFont="NunitoSansSemiBold"
          titleSize="md"
          rounded="md"
          style={styles.button}
          onPress={handleCheckoutPress}
        />
      </View>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  wrapper: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    gap: 30,
  },
  button: {
    paddingVertical: 16,
    marginTop: 'auto',
  },
});

CheckoutScreen.displayName = 'CheckoutScreen';

export default CheckoutScreen;
