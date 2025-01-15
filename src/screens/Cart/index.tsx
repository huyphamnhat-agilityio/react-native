import {StyleSheet, View} from 'react-native';
import {CartItem} from 'src/components/common';
import {colors} from 'src/themes';

const CartScreen = () => {
  return (
    <View style={styles.container}>
      <CartItem hasDividerStroke />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
});
export default CartScreen;
