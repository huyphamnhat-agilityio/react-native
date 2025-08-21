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
import { fadeIn400, fadeInLeft400, TABLET_DEVICE_WIDTH } from "@/constants";
import { useScreenDimensions } from "@/store";

export type ProductDetailTitleProps = {
  name: string;
  price: number;
  originalPrice: number;
};
const ProductDetailTitle = memo(
  ({ name, price, originalPrice }: ProductDetailTitleProps) => {
    const { screenWidth } = useScreenDimensions();
    return (
      <Animated.View entering={fadeIn400} style={styles.titleWrapper}>
        <Animated.View entering={fadeIn400}>
          <Text
            font="Montserrat_700Bold"
            textVariant="quaternary"
            size={screenWidth > TABLET_DEVICE_WIDTH ? 6 : 4.5}
          >
            {name}
          </Text>
        </Animated.View>
        <View style={styles.priceWrapper}>
          <Animated.View entering={fadeInLeft400}>
            <Text
              font="Montserrat_700Bold"
              textVariant="primary"
              size={screenWidth > TABLET_DEVICE_WIDTH ? 5 : 4.5}
            >
              {formatNumberWithThousandSeparator(price)}
            </Text>
          </Animated.View>

          <Animated.View entering={fadeInLeft400}>
            <Text
              textVariant="quaternary"
              size={screenWidth > TABLET_DEVICE_WIDTH ? 4 : 3.5}
            >
              <Text
                textVariant="quaternary"
                size={screenWidth > TABLET_DEVICE_WIDTH ? 4.5 : 3}
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
