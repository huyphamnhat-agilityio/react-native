import {memo, useCallback} from 'react';
import {
  Image,
  StyleProp,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';

// Themes
import {borderRadius, colors} from 'src/themes';

// Components
import {Button, QuantityControl, Text} from 'src/components/common';

// Icons
import {CrossIcon} from 'src/components/icons';

// Types & Interfaces
import {CartItemData} from 'src/interfaces';
import {useCartStore} from 'src/store';
import {useShallow} from 'zustand/shallow';

export interface CartItemProps extends ViewProps {
  hasDividerStroke?: boolean;
  data: CartItemData;
}
const CartItem = memo(
  ({
    hasDividerStroke,
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

    const strokeStyle: StyleProp<ViewStyle> = hasDividerStroke
      ? {
          paddingBottom: 12,
          borderBottomWidth: 1,
          borderColor: colors.border.tertiary,
        }
      : {};
    return (
      <View style={[styles.container, strokeStyle, style]} {...props}>
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
                {price}
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
