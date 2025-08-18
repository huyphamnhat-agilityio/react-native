import { memo } from "react";
import { StyleSheet, View } from "react-native";

// Components
import { Button } from "@/components/common";

// Constants
import {
  fadeInDown400,
  MEDIUM_DEVICE_HEIGHT,
  SCREEN_HEIGHT,
} from "@/constants";

// Themes
import { background } from "@/themes";

// Store
import { useUserStore } from "@/store";

// Utils
import { isFulfilledObject } from "@/utils";
import Animated from "react-native-reanimated";

export type CartFooterProps = {
  canCheckout?: boolean;
  onNavigate?: () => void;
};
const CartFooter = memo(
  ({ onNavigate, canCheckout = false }: CartFooterProps) => {
    const userAddress = useUserStore((state) => state.user?.address);

    return (
      <View style={styles.cartFooter}>
        <Animated.View entering={fadeInDown400}>
          <Button
            title="Continue to Payment"
            titleFont="Montserrat_600SemiBold"
            titleSize={4.5}
            style={styles.paymentButton}
            rounded="full"
            disabled={!isFulfilledObject(userAddress) || !canCheckout}
            onPress={onNavigate}
          />
        </Animated.View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  cartFooter: {
    marginTop: 16,
    paddingTop: 12,
    paddingHorizontal: 32,
    paddingBottom: SCREEN_HEIGHT >= MEDIUM_DEVICE_HEIGHT ? 28 : 16,
    backgroundColor: background.white,
  },
  paymentButton: {
    width: "100%",
    paddingVertical: 16,
  },
});

CartFooter.displayName = "CartFooter";
export default CartFooter;
