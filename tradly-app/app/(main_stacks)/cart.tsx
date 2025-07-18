import { useCallback, useEffect, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Alert, StyleSheet, ToastAndroid, View } from "react-native";
import { useRouter } from "expo-router";

// Themes
import { background } from "@/themes";

// Components
import { CartBill, CartFooter, CartItemList } from "@/components/ui/cart";
import { AddressInfoSection } from "@/components/common";

// Hooks
import { useGetCart, useHandleExpiredToken, useUpdateCart } from "@/hooks";

// Store
import { useUserStore } from "@/store";

// Constants
import { QUERY_KEY } from "@/constants";

// Types & Interfaces
import { CartTotal, Cart as CartType } from "@/interfaces";

// Utils
import { getCartSummary } from "@/utils";

const Cart = () => {
  const userId = useUserStore((state) => state.user?.id ?? "");

  const { navigate } = useRouter();

  const [{ totalPrice, totalQuantity }, setCartTotal] = useState<CartTotal>({
    totalPrice: 0,
    totalQuantity: 0,
  });
  const { data, isLoading, error } = useGetCart({ id: userId });

  const { mutateAsync: updateCart } = useUpdateCart();

  const queryClient = useQueryClient();

  const parsedErrorMessage = useMemo(() => {
    try {
      return JSON.parse(error?.message ?? "{}");
    } catch {
      return {};
    }
  }, [error]);

  useHandleExpiredToken(parsedErrorMessage);

  const items = useMemo(() => data?.items ?? [], [data]);

  const handleConfirmRemove = useCallback(
    async (id: string) => {
      const updatedItems = items.filter((item) => item.id !== id);

      const previousData = queryClient.getQueryData<CartType>(
        QUERY_KEY.CARTS({ id: userId }),
      );

      await updateCart(
        { userId, items: updatedItems },
        {
          onSuccess: () => {
            queryClient.setQueryData<CartType>(
              QUERY_KEY.CARTS({ id: userId }),
              {
                ...previousData!,
                items: updatedItems,
              },
            );
          },
          onError: (error) => {
            ToastAndroid.showWithGravity(
              error.message,
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
            );
          },
        },
      );
    },
    [items, queryClient, updateCart, userId],
  );

  const handleRemove = useCallback(
    (id: string) => {
      Alert.alert(
        "Remove Item",
        "Are you sure you want to remove this item from your cart?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Remove",
            onPress: () => {
              handleConfirmRemove(id);
            },
          },
        ],
        { cancelable: true },
      );
    },
    [handleConfirmRemove],
  );

  const handleUpdateQuantity = useCallback(
    async (id: string, quantity: number) => {
      const updatedItems = items.map((item) =>
        item.id === id ? { ...item, quantity } : item,
      );

      await updateCart(
        { userId, items: updatedItems },
        {
          onSuccess: () => {
            const previousData = queryClient.getQueryData<CartType>(
              QUERY_KEY.CARTS({ id: userId }),
            );

            queryClient.setQueryData<CartType>(
              QUERY_KEY.CARTS({ id: userId }),
              {
                ...previousData!,
                items: updatedItems,
              },
            );
          },
        },
      );
    },
    [items, queryClient, updateCart, userId],
  );

  const handleNavigateToPayment = useCallback(() => {
    navigate({
      pathname: "/(main_stacks)/payment",
      params: { totalPrice, totalQuantity },
    });
  }, [navigate, totalPrice, totalQuantity]);

  useEffect(() => {
    const cartTotal = getCartSummary(items);
    setCartTotal(cartTotal);
  }, [items]);

  return (
    <View style={styles.container}>
      <AddressInfoSection />

      <CartItemList
        data={items}
        isLoading={isLoading}
        errorMessage={error?.message}
        onRemove={handleRemove}
        onUpdateQuantity={handleUpdateQuantity}
      />

      <CartBill totalPrice={totalPrice} totalQuantity={totalQuantity} />

      <CartFooter
        canCheckout={items.length > 0}
        onNavigate={handleNavigateToPayment}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: background.secondary,
  },
});

export default Cart;
