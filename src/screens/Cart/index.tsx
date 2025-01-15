import {StyleSheet, View} from 'react-native';

// Components
import {CartList} from 'src/components';
import {Button, Text} from 'src/components/common';

// Store
import {useCartStore} from 'src/store';

// Themes
import {colors} from 'src/themes';

const CartScreen = () => {
  const cart = useCartStore(state => state.cart);

  return (
    <View style={styles.container}>
      <CartList cartItems={cart} />
      <View style={styles.wrapper}>
        <View style={styles.stat}>
          <Text font="NunitoSansBold" size="lg" textVariant="quaternary">
            Total:
          </Text>
          <Text font="NunitoSansBold" size="lg" textVariant="secondary">
            $ 95.00
          </Text>
        </View>
        <Button
          style={styles.button}
          width="100%"
          rounded="md"
          titleFont="NunitoSansSemiBold"
          titleSize="md"
          title="Check out"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  wrapper: {
    gap: 20,
  },
  stat: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    paddingVertical: 16,
  },
});
export default CartScreen;
