import React, { memo } from "react";
import { StyleSheet, View } from "react-native";

// Utils
import { formatNumberWithThousandSeparator } from "@/utils";

// Components
import { Button, Text } from "@/components/common";

// Constants
import { MEDIUM_DEVICE_HEIGHT, SCREEN_HEIGHT } from "@/constants";

// Themes
import { background } from "@/themes";

export type PaymentFooterProps = {
  totalQuantity: number;
  totalPrice: number;
  canCheckout?: boolean;
  disabled?: boolean;
  handleCheckout?: () => Promise<void>;
};
const PaymentFooter = memo(
  ({
    totalPrice,
    totalQuantity,
    canCheckout = false,
    disabled = false,
    handleCheckout,
  }: PaymentFooterProps) => {
    return (
      <View style={styles.cartBillWrapper}>
        <View style={styles.cartBillDetail}>
          <Text font="Montserrat_600SemiBold" size={4.5} textVariant="black">
            Price Details
          </Text>

          <View style={styles.detailRow}>
            <View style={styles.detailLabel}>
              <Text textVariant="black">
                Price ({totalQuantity} item
                {totalQuantity > 1 && "s"})
              </Text>
            </View>
            <View style={styles.detailValue}>
              <Text textVariant="black">
                {formatNumberWithThousandSeparator(totalPrice)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.buttonWrapper}>
          <Button
            title="Checkout"
            rounded="full"
            titleFont="Montserrat_600SemiBold"
            titleSize={4.5}
            style={styles.button}
            disabled={!canCheckout || disabled}
            onPress={handleCheckout}
          />
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  cartBillWrapper: {
    marginTop: "auto",
    paddingTop: SCREEN_HEIGHT >= MEDIUM_DEVICE_HEIGHT ? 16 : 8,
    backgroundColor: background.white,
    shadowColor: background.backdrop,
    elevation: 40,
    paddingBottom: "4%",
  },
  cartBillDetail: {
    paddingHorizontal: 16,
    gap: SCREEN_HEIGHT >= MEDIUM_DEVICE_HEIGHT ? 8 : 0,
  },
  detailRow: {
    flexDirection: "row",
    gap: 20,
    marginTop: 12,
  },
  detailLabel: {
    flex: 1,
    gap: 12,
  },
  detailValue: {
    flex: 0,
    gap: 12,
    flexWrap: "wrap",
  },
  buttonWrapper: {
    paddingHorizontal: 32,
  },
  button: {
    width: "100%",
    paddingVertical: 16,
    marginTop: 24,
  },
});

PaymentFooter.displayName = "PaymentFooter";
export default PaymentFooter;
