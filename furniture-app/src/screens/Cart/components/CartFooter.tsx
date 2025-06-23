import { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'src/components/common';

interface CartFooterProps {
  totalMoney: number;
  onCheckout: () => void;
}

const CartFooter = memo(({ totalMoney, onCheckout }: CartFooterProps) => {
  return (
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
        onPress={onCheckout}
        disabled={totalMoney === 0}
        width="100%"
        rounded="md"
        titleFont="NunitoSansSemiBold"
        titleSize="md"
        title="Check out"
      />
    </View>
  );
});

const styles = StyleSheet.create({
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

CartFooter.displayName = 'CartFooter';

export default CartFooter;
