import { memo, useCallback, useEffect, useRef } from "react";
import { Image } from "expo-image";
import { StyleSheet, ToastAndroid, TouchableOpacity, View } from "react-native";

// Components
import { QuantityControl, Text } from "@/components/common";

// Themes
import { background, borderRadius, colors } from "@/themes";

// Interfaces
import { CartItemData } from "@/interfaces";

// Hooks
import { useDebounce } from "@/hooks";
import Animated, { FadeInDown } from "react-native-reanimated";

export type CartItemProps = CartItemData & {
  quantity: number;
  onRemove: (id: string) => void;
  onUpdate: (id: string, quantity: number) => Promise<void>;
};

const CartItem = memo(
  ({
    id,
    image,
    productName,
    price,
    originalPrice,
    quantity,
    onRemove,
    onUpdate,
  }: CartItemProps) => {
    // Ref to skip effect on initial render
    // This ensures the effect only runs when debouncedQuantity changes after mount
    const didMount = useRef(false);

    const handleRemoveItem = useCallback(() => {
      onRemove(id);
    }, [id, onRemove]);

    const {
      value: currentQuantity,
      debouncedValue: debouncedQuantity,
      setValue: setQuantityDebounce,
      setInitialValue,
    } = useDebounce(quantity, 500);

    const handleChangeQuantity = useCallback(
      async (value: number) => {
        try {
          await onUpdate?.(id, value);
        } catch (error) {
          ToastAndroid.showWithGravity(
            (error as Error).message,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
          );
          setInitialValue(quantity);
        }
      },
      [id, onUpdate, quantity, setInitialValue],
    );

    useEffect(() => {
      if (didMount.current) {
        handleChangeQuantity(debouncedQuantity);
      } else {
        didMount.current = true;
      }
    }, [debouncedQuantity, handleChangeQuantity]);

    return (
      <Animated.View entering={FadeInDown} style={styles.cartItemContainer}>
        <View style={styles.cartItemWrapper}>
          <Image
            source={{
              uri: image,
            }}
            style={styles.cartItemImage}
            transition={{
              duration: 400,
              effect: "cross-dissolve",
              timing: "ease-in",
            }}
          />

          <View style={styles.cartItemContent}>
            <Text textVariant="quaternary">{productName}</Text>
            <View style={styles.cartItemPriceWrapper}>
              <Text font="Montserrat_700Bold" size={4.5}>
                ${price}
              </Text>
              <Text textVariant="secondary">
                <Text
                  style={styles.cartItemOriginalPrice}
                  textVariant="secondary"
                >
                  ${originalPrice}
                </Text>{" "}
                50% off
              </Text>
            </View>
            <QuantityControl
              quantity={currentQuantity}
              setQuantity={setQuantityDebounce}
            />
          </View>
        </View>
        <View style={styles.cartItemSeparator} />
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.cartItemFooter}
          onPress={handleRemoveItem}
        >
          <Text textVariant="secondary" style={styles.textCentered}>
            Remove
          </Text>
        </TouchableOpacity>
      </Animated.View>
    );
  },
);

const styles = StyleSheet.create({
  cartItemContainer: {
    paddingTop: 28,
    shadowColor: background.backdrop,
    elevation: 40,
    backgroundColor: background.white,
  },
  cartItemWrapper: {
    flexDirection: "row",
    gap: 16,
    paddingLeft: 16,
  },
  cartItemImage: {
    width: 102,
    height: 102,
    borderRadius: borderRadius["2.5"],
  },
  cartItemContent: {
    gap: 12,
  },
  cartItemPriceWrapper: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  cartItemOriginalPrice: {
    textDecorationLine: "line-through",
  },
  cartItemSeparator: {
    height: 0.5,
    backgroundColor: colors.gray_50,
    marginTop: 12,
  },
  cartItemFooter: {
    paddingVertical: 12,
  },
  textCentered: {
    textAlign: "center",
  },
});

CartItem.displayName = "CartItem";
export default CartItem;
