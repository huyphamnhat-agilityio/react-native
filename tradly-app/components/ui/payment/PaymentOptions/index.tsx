import { memo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

// Constants
import {
  fadeInLeft400,
  fadeInRight400,
  PAYMENT_OPTIONS,
  TABLET_DEVICE_WIDTH,
} from "@/constants";

// Themes
import { background, border } from "@/themes";

// Components
import { Checkbox, Text } from "@/components/common";
import Animated from "react-native-reanimated";
import { useScreenDimensions } from "@/store";

export type PaymentOptionsProps = {
  selectedPayment: "CARD" | "CASH";
  setSelectedPayment: React.Dispatch<React.SetStateAction<"CARD" | "CASH">>;
  disabled?: boolean;
};
const PaymentOptions = memo(
  ({
    selectedPayment,
    setSelectedPayment,
    disabled = false,
  }: PaymentOptionsProps) => {
    const { screenWidth } = useScreenDimensions();
    return (
      <View style={styles.optionsContainer}>
        {Object.entries(PAYMENT_OPTIONS).map(([key, label], index) => {
          const isSelected = selectedPayment === key;
          return (
            <TouchableOpacity
              key={key}
              style={[styles.optionItem, index === 0 && styles.firstOption]}
              onPress={() =>
                setSelectedPayment(key as keyof typeof PAYMENT_OPTIONS)
              }
              activeOpacity={0.8}
              disabled={disabled}
            >
              <Animated.View entering={fadeInLeft400}>
                <Checkbox
                  size={screenWidth >= TABLET_DEVICE_WIDTH ? 28 : 20}
                  active={isSelected}
                  onPress={() =>
                    setSelectedPayment(key as keyof typeof PAYMENT_OPTIONS)
                  }
                />
              </Animated.View>
              <Animated.View entering={fadeInRight400}>
                <Text
                  size={screenWidth >= TABLET_DEVICE_WIDTH ? 4.5 : 3.5}
                  textVariant="quaternary"
                  font="Montserrat_600SemiBold"
                >
                  {label}
                </Text>
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  optionsContainer: {
    backgroundColor: background.white,
    marginTop: 6,
  },
  optionItem: {
    flexDirection: "row",
    gap: 8,
    borderTopWidth: 0.5,
    borderTopColor: border.alternative,
    paddingHorizontal: 20,
    paddingVertical: 14,
    alignItems: "center",
  },
  firstOption: {
    borderTopWidth: 0,
  },
});

PaymentOptions.displayName = "PaymentOptions";
export default PaymentOptions;
