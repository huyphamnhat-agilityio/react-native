import {memo, useCallback} from 'react';
import {Dimensions, ListRenderItemInfo, StyleSheet, View} from 'react-native';
import {useShallow} from 'zustand/shallow';

// Types & Interfaces
import {CartItemData, StackNavigation} from 'src/interfaces';

// Components
import {Button, Text} from 'src/components/common';
import {CartItem, CartList} from 'src/components';

// Store
import {useCartStore} from 'src/store';

// Themes
import {colors} from 'src/themes';

// Constants
import {MEDIUM_DEVICE_HEIGHT} from 'src/constants';

export interface CartScreenProps {
  navigation: StackNavigation;
}

const height = Dimensions.get('window').height;

const CartScreen = memo(({navigation: {navigate}}: CartScreenProps) => {
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

  const CartSeparatorComponent = useCallback(
    () => (
      <View style={styles.separatorWrapper}>
        <View style={styles.separator} />
      </View>
    ),
    [],
  );

  const handleRenderItem = useCallback(
    ({item}: ListRenderItemInfo<CartItemData>) => (
      <CartItem key={item.id} data={item} />
    ),
    [],
  );
  const totalMoney = getTotalMoney();
  return (
    <View style={styles.container}>
      <CartList
        removeClippedSubviews={false}
        data={cart}
        renderItem={handleRenderItem}
        ItemSeparatorComponent={CartSeparatorComponent}
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
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: height >= MEDIUM_DEVICE_HEIGHT ? 30 : 15,
    gap: 20,
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
  separatorWrapper: {
    flex: 1,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: colors.border.tertiary,
  },
});

CartScreen.displayName = 'CartScreen';

export default CartScreen;
