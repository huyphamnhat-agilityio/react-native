import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

// Components
import { Text } from "@/components/common";

// Themes
import { background } from "@/themes";

// Utils
import { formatNumberWithThousandSeparator, getSalePercentage } from "@/utils";

// Constants
import { fadeIn400, fadeInLeft400 } from "@/constants";

export type ProductDetailTitleProps = {
  name: string;
  price: number;
  originalPrice: number;
};
const ProductDetailTitle = memo(
  ({ name, price, originalPrice }: ProductDetailTitleProps) => {
    return (
      <Animated.View entering={fadeIn400} style={styles.titleWrapper}>
        <Animated.View entering={fadeIn400}>
          <Text font="Montserrat_700Bold" textVariant="quaternary" size={4.5}>
            {name}
          </Text>
        </Animated.View>
        <View style={styles.priceWrapper}>
          <Animated.View entering={fadeInLeft400}>
            <Text font="Montserrat_700Bold" textVariant="primary" size={4.5}>
              {formatNumberWithThousandSeparator(price)}
            </Text>
          </Animated.View>

          <Animated.View entering={fadeInLeft400}>
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
          </Animated.View>
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
