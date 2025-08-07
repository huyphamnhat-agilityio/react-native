import { memo } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

// Components
import { Text } from "@/components/common";

// Themes
import { background } from "@/themes";

const ProductDetailAdditional = memo(() => {
  return (
    <Animated.View
      entering={FadeIn.duration(500)}
      style={styles.deliveryWrapper}
    >
      <Text font="Montserrat_600SemiBold" size={4.5} textVariant="black">
        Additional Details
      </Text>

      <View style={styles.detailRow}>
        <Text
          style={styles.detailLabel}
          font="Montserrat_400Regular"
          textVariant="tertiary"
          size={3.5}
        >
          Delivery Details
        </Text>
        <Text style={styles.detailValue} textVariant="quaternary" size={3.5}>
          Home Delivery Available, Cash On Delivery
        </Text>
      </View>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  deliveryWrapper: {
    marginTop: 6,
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: background.white,
  },
  detailRow: {
    flexDirection: "row",
    gap: 20,
    marginTop: 12,
    alignItems: "flex-start",
  },
  detailLabel: {
    flex: 1,
    gap: 12,
  },
  detailValue: {
    flex: 2,
    gap: 12,
    flexWrap: "wrap",
  },
});

ProductDetailAdditional.displayName = "ProductDetailAdditional";
export default ProductDetailAdditional;
