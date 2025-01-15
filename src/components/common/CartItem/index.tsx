import {memo} from 'react';
import {
  Image,
  StyleProp,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';

// Store
import {useCartStore} from 'src/store';

// Themes
import {borderRadius, colors} from 'src/themes';

// Components
import {Button, QuantityControl, Text} from 'src/components/common';

// Icons
import {CrossIcon} from 'src/components/icons';

export interface CartItemProps extends ViewProps {
  hasDividerStroke?: boolean;
}
const CartItem = memo(({hasDividerStroke, style, ...props}: CartItemProps) => {
  const {image, productName, price} = useCartStore(state => state.cart[0]);

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
          />
        </View>

        <QuantityControl style={styles.quantity} setQuantity={() => {}} />
      </View>
    </View>
  );
});

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
