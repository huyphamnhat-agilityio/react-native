import {StyleSheet, View} from 'react-native';

// Components
import {CartList} from 'src/components';
import {Button, CartItem, Text} from 'src/components/common';

// Store
import {useCartStore} from 'src/store';

// Themes
import {colors} from 'src/themes';
import {useShallow} from 'zustand/shallow';

const CartScreen = () => {
  const {cart, getTotalMoney} = useCartStore(
    useShallow(state => ({
      cart: state.cart,
      getTotalMoney: state.getTotalMoney,
    })),
  );

  return (
    <View style={styles.container}>
      <CartList
        data={cart}
        renderItem={({item, index}) => (
          <CartItem
            key={item.id}
            data={item}
            hasDividerStroke={index < cart.length - 1}
          />
        )}
      />
      <View style={styles.wrapper}>
        <View style={styles.stat}>
          <Text font="NunitoSansBold" size="lg" textVariant="quaternary">
            Total:
          </Text>
          <Text font="NunitoSansBold" size="lg" textVariant="secondary">
            $ {getTotalMoney()}
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
