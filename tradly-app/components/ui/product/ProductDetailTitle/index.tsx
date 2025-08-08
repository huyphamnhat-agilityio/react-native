import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

// Components
import { Text } from "@/components/common";

// Themes
import { background } from "@/themes";

// Utils
import { formatNumberWithThousandSeparator, getSalePercentage } from "@/utils";

export type ProductDetailTitleProps = {
  name: string;
  price: number;
  originalPrice: number;
};
const ProductDetailTitle = memo(
  ({ name, price, originalPrice }: ProductDetailTitleProps) => {
    return (
      <Animated.View entering={FadeIn} style={styles.titleWrapper}>
        <Text font="Montserrat_700Bold" textVariant="quaternary" size={4.5}>
          {name}
        </Text>
        <View style={styles.priceWrapper}>
          <Text font="Montserrat_700Bold" textVariant="primary" size={4.5}>
            {formatNumberWithThousandSeparator(price)}
          </Text>
          <Text textVariant="quaternary">
            <Text
              textVariant="quaternary"
              size={3.5}
              style={styles.originalPrice}
            >
              {formatNumberWithThousandSeparator(originalPrice)}
            </Text>{" "}
            {Math.round(getSalePercentage(originalPrice, price))}% off
          </Text>
        </View>
      </Animated.View>
    );
  },
);

const styles = StyleSheet.create({
  titleWrapper: {
    flexDirection: "column",
    gap: 10,
    padding: 16,
    backgroundColor: background.white,
  },

  priceWrapper: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },

  originalPrice: {
    textDecorationLine: "line-through",
  },
});

ProductDetailTitle.displayName = "ProductDetailTitle";
export default ProductDetailTitle;
