import { memo, useCallback, useEffect, useRef } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

// Themes
import { borderRadius } from 'src/themes';

// Components
import { Button, QuantityControl, Text } from 'src/components/common';

// Icons
import { CrossIcon } from 'src/components/icons';

// Types & Interfaces
import { CartItemData } from 'src/interfaces';

// Hooks
import { useDebounce } from 'src/hooks';
import FastImage from '@d11/react-native-fast-image';

export type CartItemProps = ViewProps & {
  data: CartItemData;
  onRemove?: (color: string) => void;
  onUpdate?: (id: string, color: string, quantity: number) => void;
  isDisabled?: boolean;
};
const CartItem = memo(
  ({
    data: { image, price, productName, quantity, selectedColor, id },
    onRemove,
    onUpdate,
    style,
    isDisabled = false,
    ...props
  }: CartItemProps) => {
    // Ref to skip effect on initial render
    // This ensures the effect only runs when debouncedQuantity changes after mount
    const didMount = useRef(false);

    const handleRemovePress = useCallback(() => {
      onRemove?.(selectedColor);
    }, [onRemove, selectedColor]);

    const {
      value: currentQuantity,
      debouncedValue: debouncedQuantity,
      setValue: setQuantityDebounce,
    } = useDebounce(quantity, 500);

    const handleChangeQuantity = useCallback(
      (value: number) => {
        onUpdate?.(id, selectedColor, value);
      },
      [id, selectedColor, onUpdate],
    );

    useEffect(() => {
      if (didMount.current) {
        handleChangeQuantity(debouncedQuantity);
      } else {
        didMount.current = true;
      }
    }, [debouncedQuantity, handleChangeQuantity]);
    return (
      <View style={[styles.container, style]} {...props}>
        <FastImage
          style={styles.image}
          source={{ uri: image }}
          resizeMode="stretch"
        />

        <View style={styles.wrapper}>
          <View style={styles.contentWrapper}>
            <View style={styles.content}>
              <Text
                numberOfLines={1}
                font="NunitoSansSemiBold"
                size="xs"
                textVariant="disabled"
              >
                {productName}
              </Text>
              <Text font="NunitoSansBold" size="sm">
                $ {price.toFixed(2)}
              </Text>
            </View>
            <Button
              IconLeft={<CrossIcon />}
              bgVariant="none"
              rounded="full"
              disabled={isDisabled}
              style={styles.button}
              onPress={handleRemovePress}
            />
          </View>

          <QuantityControl
            isDisabled={isDisabled}
            quantity={currentQuantity}
            style={styles.quantity}
            setQuantity={setQuantityDebounce}
          />
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    gap: 20,
  },
  image: {
    borderRadius: borderRadius.base,
    width: 100,
    height: 100,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'space-between',
    gap: 22,
  },
  contentWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  content: { gap: 6, maxWidth: '80%' },
  button: {
    padding: 0,
  },
  quantity: {
    flex: 1,
    justifyContent: 'flex-start',
  },
});

CartItem.displayName = 'CartItem';
export default CartItem;
