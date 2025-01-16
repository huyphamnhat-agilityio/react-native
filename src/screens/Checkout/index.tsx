import {StyleSheet, View} from 'react-native';

// Components
import {
  Button,
  DeliveryMethodCard,
  PaymentCard,
  ShippingAddressCard,
  TotalCard,
} from 'src/components/common';

// Themes
import {colors} from 'src/themes';

// Store
import {useCartStore} from 'src/store';

const CheckoutScreen = () => {
  const getTotalMoney = useCartStore(state => state.getTotalMoney);

  const totalMoney = getTotalMoney();
  return (
    <View style={styles.container}>
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
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 20,
    paddingBottom: 35,
    paddingVertical: 15,
    paddingHorizontal: 20,
    gap: 30,
  },
  button: {
    paddingVertical: 16,
    marginTop: 'auto',
  },
});

export default CheckoutScreen;
