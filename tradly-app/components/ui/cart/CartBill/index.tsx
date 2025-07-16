import { memo } from "react";
import { StyleSheet, View } from "react-native";

// Constants
import { MEDIUM_DEVICE_HEIGHT, SCREEN_HEIGHT } from "@/constants";

// Themes
import { background, colors } from "@/themes";

// Components
import { Text } from "@/components/common";

// Types & Interfaces
import { CartTotal } from "@/interfaces";

// Utils
import { formatNumberWithThousandSeparator } from "@/utils";

export type CartBillProps = CartTotal;

const CartBill = memo(({ totalPrice, totalQuantity }: CartBillProps) => {
  return (
    <View style={styles.cartBillWrapper}>
      <View style={styles.cartBillDetail}>
        <Text font="Montserrat_600SemiBold" size={4.5} textVariant="black">
          Price Details
        </Text>

        <View style={styles.detailRow}>
          <View style={styles.detailLabel}>
            <Text textVariant="black">
              Price ({totalQuantity} item{totalQuantity > 1 && "s"})
            </Text>
            <Text textVariant="black">Delivery Fee</Text>
          </View>
          <View style={styles.detailValue}>
            <Text textVariant="black">
              {formatNumberWithThousandSeparator(totalPrice)}
            </Text>
            <Text textVariant="black">Info</Text>
          </View>
        </View>
      </View>

      <View style={styles.cartBillSeparator} />

      <View style={styles.cartBillTotal}>
        <Text font="Montserrat_600SemiBold" size={4.5} textVariant="black">
          Total
        </Text>
        <Text font="Montserrat_700Bold" size={4.5} textVariant="black">
          {formatNumberWithThousandSeparator(totalPrice)}
        </Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  cartBillWrapper: {
    marginTop: 8,
    paddingTop: SCREEN_HEIGHT >= MEDIUM_DEVICE_HEIGHT ? 16 : 8,
    backgroundColor: background.white,
    shadowColor: background.backdrop,
    elevation: 40,
  },
  cartBillDetail: {
    paddingHorizontal: 16,
    gap: SCREEN_HEIGHT >= MEDIUM_DEVICE_HEIGHT ? 20 : 0,
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
  cartBillSeparator: {
    height: 0.5,
    backgroundColor: colors.gray_50,
    marginTop: SCREEN_HEIGHT > MEDIUM_DEVICE_HEIGHT ? 24 : 8,
  },
  cartBillTotal: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: SCREEN_HEIGHT >= MEDIUM_DEVICE_HEIGHT ? 44 : 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

CartBill.displayName = "CartBill";
export default CartBill;
