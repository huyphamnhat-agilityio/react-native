import {memo, useCallback} from 'react';
import {Image, StyleSheet, View, ViewProps} from 'react-native';
import {useShallow} from 'zustand/shallow';

// Themes
import {borderRadius} from 'src/themes';

// Components
import {Button, QuantityControl, Text} from 'src/components/common';

// Icons
import {CrossIcon} from 'src/components/icons';

// Types & Interfaces
import {CartItemData} from 'src/interfaces';

// Stores
import {useCartStore} from 'src/store';

export interface CartItemProps extends ViewProps {
  data: CartItemData;
}
const CartItem = memo(
  ({
    data: {image, price, productName, quantity, selectedColor, id},
    style,
    ...props
  }: CartItemProps) => {
    const {removeFromCart, updateQuantity} = useCartStore(
      useShallow(state => ({
        removeFromCart: state.removeFromCart,
        updateQuantity: state.updateQuantity,
      })),
    );

    const handleRemoveButtonPress = useCallback(
      (color: string) => () => {
        removeFromCart(color);
      },
      [removeFromCart],
    );

    const handleChangeQuantity = useCallback(
      (productId: string, color: string) => (value: number) => {
        updateQuantity(productId, color, value);
      },
      [updateQuantity],
    );

    return (
      <View style={[styles.container, style]} {...props}>
        <Image
          source={{uri: image}}
          width={100}
          height={100}
          resizeMode="stretch"
          style={styles.image}
        />
        <View style={styles.wrapper}>
          <View style={styles.contentWrapper}>
            <View style={styles.content}>
              <Text
                numberOfLines={1}
                font="NunitoSansSemiBold"
                size="xs"
                textVariant="disabled">
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
              style={styles.button}
              onPress={handleRemoveButtonPress(selectedColor)}
            />
          </View>

          <QuantityControl
            quantity={quantity}
            style={styles.quantity}
            setQuantity={handleChangeQuantity(id, selectedColor)}
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
  content: {gap: 6},
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
