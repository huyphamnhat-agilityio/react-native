import {memo, useCallback} from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';

// Components
import {Button, TextInput} from 'src/components/common';
import {MinusIcon, PlusIcon} from 'src/components/icons';
import {borderRadius, colors} from 'src/themes';
import {parseToInt} from 'src/utils';

export type QuantityControlProps = ViewProps & {
  quantity?: number;
  max?: number;
  min?: number;
  setQuantity: (quantity: number) => void;
  isDisabled?: boolean;
};
const QuantityControl = memo(
  ({
    quantity = 1,
    max = 999,
    min = 1,
    setQuantity,
    style,
    isDisabled = false,
    ...props
  }: QuantityControlProps) => {
    const isMaximum = quantity >= max;
    const isMinimum = quantity <= min;

    const handleChangeQuantity = useCallback(
      (amount: number) => () => {
        setQuantity(quantity + amount);
      },
      [quantity, setQuantity],
    );

    const handleOnChange = useCallback(
      (value: string) => {
        setQuantity(parseToInt(value, min, max));
      },
      [max, min, setQuantity],
    );

    return (
      <View style={[styles.container, style]} {...props}>
        <Button
          testID="increase-quantity"
          IconLeft={<PlusIcon opacity={isMaximum ? 0.5 : 1} />}
          bgVariant="none"
          onPress={handleChangeQuantity(1)}
          disabled={isMaximum || isDisabled}
          style={styles.button}
        />
        <TextInput
          testID="quantity-input"
          innerBorderBottomWidth={0}
          inputWidth={30}
          inputHeight={20}
          inputMode="numeric"
          font="NunitoSansSemiBold"
          inputVariant="primary"
          textAlign="center"
          isDisabled={isDisabled}
          onChangeText={handleOnChange}
          value={quantity.toString()}
        />
        <Button
          testID="decrease-quantity"
          IconLeft={<MinusIcon opacity={isMinimum ? 0.5 : 1} />}
          bgVariant="none"
          onPress={handleChangeQuantity(-1)}
          disabled={quantity <= min || isDisabled}
          style={styles.button}
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 15,
  },
  button: {
    width: 30,
    height: 30,
    padding: 0,
    backgroundColor: colors.gray,
    borderRadius: borderRadius.sm,
  },
});

QuantityControl.displayName = 'QuantityControl';

export default QuantityControl;
