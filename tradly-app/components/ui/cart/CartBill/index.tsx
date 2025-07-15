import { memo } from "react";
import { StyleSheet, View } from "react-native";

// Constants
import { MEDIUM_DEVICE_HEIGHT, SCREEN_HEIGHT } from "@/constants";

// Themes
import { background, colors } from "@/themes";

// Components
import { Text } from "@/components/common";

const CartBill = memo(() => {
  return (
    <View style={styles.cartBillWrapper}>
      <View style={styles.cartBillDetail}>
        <Text font="Montserrat_600SemiBold" size={4.5} textVariant="black">
          Price Details
        </Text>

        <View style={styles.detailRow}>
          <View style={styles.detailLabel}>
            <Text textVariant="black" font="Montserrat_500Medium">
              Price (1 item)
            </Text>
            <Text textVariant="black" font="Montserrat_500Medium">
              Delivery Fee
            </Text>
          </View>
          <View style={styles.detailValue}>
            <Text textVariant="black" font="Montserrat_500Medium">
              $25
            </Text>
            <Text textVariant="black" font="Montserrat_500Medium">
              Info
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.cartBillSeparator} />

      <View style={styles.cartBillTotal}>
        <Text font="Montserrat_600SemiBold" size={4.5} textVariant="black">
          Total
        </Text>
        <Text font="Montserrat_700Bold" size={4.5} textVariant="black">
          $25
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
