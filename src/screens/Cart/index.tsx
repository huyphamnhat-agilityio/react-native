import {StyleSheet, View} from 'react-native';
import {useShallow} from 'zustand/shallow';

// Types & Interfaces
import {StackNavigation} from 'src/interfaces';

// Components
import {Button, CartItem, Text} from 'src/components/common';
import {CartList} from 'src/components';

// Store
import {useCartStore} from 'src/store';

// Themes
import {colors} from 'src/themes';
import {useCallback} from 'react';

export interface CartScreenProps {
  navigation: StackNavigation;
}
const CartScreen = ({navigation: {navigate}}: CartScreenProps) => {
  const {cart, getTotalMoney} = useCartStore(
    useShallow(state => ({
      cart: state.cart,
      getTotalMoney: state.getTotalMoney,
    })),
  );

  const handleCheckoutPress = useCallback(
    () => navigate('Checkout'),
    [navigate],
  );

  const totalMoney = getTotalMoney();
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
            $ {totalMoney.toFixed(2)}
          </Text>
        </View>

        <Button
          style={styles.button}
          onPress={handleCheckoutPress}
          disabled={totalMoney === 0}
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
