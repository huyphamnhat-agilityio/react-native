import {StyleSheet, View} from 'react-native';

// Components
import {CartList} from 'src/components';

// Store
import {useCartStore} from 'src/store';

// Themes
import {colors} from 'src/themes';

const CartScreen = () => {
  const cart = useCartStore(state => state.cart);

  return (
    <View style={styles.container}>
      <CartList cartItems={cart} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    paddingHorizontal: 20,
  },
});
export default CartScreen;
