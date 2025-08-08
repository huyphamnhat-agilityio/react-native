import { useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { StyleSheet, ToastAndroid } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

// Components
import { AddressInfoSection } from "@/components/common";
import {
  PaymentCardCarousel,
  PaymentFooter,
  PaymentOptions,
} from "@/components/ui/payment";

// Constants
import { PAYMENT_OPTIONS, QUERY_KEY } from "@/constants";

// Hooks
import { useUpdateCart } from "@/hooks";

// Types
import { Cart } from "@/interfaces";

// Store
import { useUserStore } from "@/store";

// Themes
import { background } from "@/themes";

// Utils
import { isFulfilledObject } from "@/utils";

const Payment = () => {
  const { totalPrice = "{}", totalQuantity = "{}" } = useLocalSearchParams();

  const { canDismiss, dismissAll, replace } = useRouter();

  const [selectedPayment, setSelectedPayment] =
    useState<keyof typeof PAYMENT_OPTIONS>("CARD");

  const [selectedCardIndex, setSelectedCardIndex] = useState(0);

  const userCards = useUserStore((state) => state.user?.cards ?? []);

  const selectedCard = userCards[selectedCardIndex];

  const formattedTotalPrice: number = JSON.parse(totalPrice as string) ?? 0;
  const formattedTotalQuantity: number =
    JSON.parse(totalQuantity as string) ?? 0;

  const userAddress = useUserStore((state) => state.user?.address);

  const userId = useUserStore((state) => state.user?.id ?? "");

  const { mutateAsync: updateCart, isPending } = useUpdateCart();

  const queryClient = useQueryClient();

  const hasValidPaymentMethod =
    selectedPayment === "CARD" && selectedCard && selectedCard.id !== "";

  const canCheckout = useMemo(
    () =>
      isFulfilledObject(userAddress) &&
      (selectedPayment === "CASH" || hasValidPaymentMethod),
    [hasValidPaymentMethod, selectedPayment, userAddress],
  );

  const handleCheckout = useCallback(async () => {
    await updateCart(
      { userId, items: [] },
      {
        onSuccess: () => {
          const previousData = queryClient.getQueryData<Cart>(
            QUERY_KEY.CARTS({ id: userId }),
          );

          queryClient.setQueryData<Cart>(QUERY_KEY.CARTS({ id: userId }), {
            ...previousData!,
            items: [],
          });

          if (canDismiss()) {
            dismissAll();
          }

          replace("/(main_stacks)/order");
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
  }, [canDismiss, dismissAll, queryClient, replace, updateCart, userId]);

  return (
    <Animated.View entering={FadeIn} style={styles.container}>
      <PaymentCardCarousel
        data={userCards}
        setSelectedCardIndex={setSelectedCardIndex}
        selectedPayment={selectedPayment}
        disabled={isPending}
      />

      <PaymentOptions
        selectedPayment={selectedPayment}
        setSelectedPayment={setSelectedPayment}
        disabled={isPending}
      />

      <AddressInfoSection disabled={isPending} style={styles.address} />

      <PaymentFooter
        totalPrice={formattedTotalPrice}
        totalQuantity={formattedTotalQuantity}
        canCheckout={canCheckout}
        disabled={isPending}
        handleCheckout={handleCheckout}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: background.secondary,
  },

  address: {
    marginTop: 16,
  },
});

export default Payment;
