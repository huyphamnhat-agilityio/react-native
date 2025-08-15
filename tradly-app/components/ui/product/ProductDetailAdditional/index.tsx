import { memo } from "react";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

// Components
import { Text } from "@/components/common";

// Themes
import { background } from "@/themes";
import { fadeInLeft400, fadeInRight400, fadeInUp400 } from "@/constants";

const ProductDetailAdditional = memo(() => {
  return (
    <View style={styles.deliveryWrapper}>
      <Animated.View entering={fadeInUp400}>
        <Text font="Montserrat_600SemiBold" size={4.5} textVariant="black">
          Additional Details
        </Text>
      </Animated.View>

      <View style={styles.detailRow}>
        <Animated.View
          entering={fadeInLeft400}
          style={styles.detailLabelWrapper}
        >
          <Text
            style={styles.detailLabel}
            font="Montserrat_400Regular"
            textVariant="tertiary"
            size={3.5}
          >
            Delivery Details
          </Text>
        </Animated.View>

        <Animated.View
          entering={fadeInRight400}
          style={styles.detailValueWrapper}
        >
          <Text style={styles.detailValue} textVariant="quaternary" size={3.5}>
            Home Delivery Available, Cash On Delivery
          </Text>
        </Animated.View>
      </View>
    </View>
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
  detailLabelWrapper: { flex: 1 },
  detailLabel: {
    gap: 12,
  },
  detailValueWrapper: {
    flex: 2,
  },
  detailValue: {
    gap: 12,
    flexWrap: "wrap",
  },
});

ProductDetailAdditional.displayName = "ProductDetailAdditional";
export default ProductDetailAdditional;
