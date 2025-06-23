import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from 'src/themes';

const CartSeparator = memo(() => (
  <View style={styles.separatorWrapper}>
    <View style={styles.separator} />
  </View>
));

const styles = StyleSheet.create({
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

CartSeparator.displayName = 'CartSeparator';

export default CartSeparator;
