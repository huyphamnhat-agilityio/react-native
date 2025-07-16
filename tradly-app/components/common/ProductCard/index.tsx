import { Image } from "expo-image";
import { memo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

// Components
import { Link } from "expo-router";
import Text from "../Text";

// Themes
import { background, border, borderRadius } from "@/themes";

// Constants
import { MEDIUM_DEVICE_HEIGHT, SCREEN_HEIGHT, SCREEN_WIDTH } from "@/constants";

// Interfaces
import { Product } from "@/interfaces";

// Icons
import { TradlyIcon } from "@/components/icons";

// Utils
import { formatNumberWithThousandSeparator } from "@/utils";

const ProductCard = memo(
  ({ id, name, imageUrl, price, originalPrice }: Product) => {
    return (
      <Link
        href={{ pathname: "/(main_stacks)/product/[id]", params: { id } }}
        asChild
      >
        <TouchableOpacity activeOpacity={0.7} style={styles.container} key={id}>
          <Image
            source={{
              uri: imageUrl,
            }}
            style={styles.image}
          />
          <View style={styles.content}>
            <Text numberOfLines={1} textVariant="quaternary">
              {name}
            </Text>
            <View style={styles.description}>
              <View style={styles.wrapper}>
                <TradlyIcon />
                <Text
                  textVariant="secondary"
                  size={SCREEN_HEIGHT >= MEDIUM_DEVICE_HEIGHT ? 3.5 : 2.5}
                >
                  Tradly
                </Text>
              </View>
              <View style={styles.priceWrapper}>
                <Text
                  numberOfLines={1}
                  textVariant="quaternary"
                  font="Montserrat_400Regular"
                  size={2.5}
                  style={styles.originalPrice}
                >
                  {formatNumberWithThousandSeparator(originalPrice)}
                </Text>
                <Text
                  numberOfLines={1}
                  textVariant="primary"
                  font="Montserrat_600SemiBold"
                >
                  {formatNumberWithThousandSeparator(price)}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Link>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH / 2 - 25,
    backgroundColor: background.white,
    borderRadius: borderRadius["2.5"],
    borderColor: border.black_opacity_10,
    borderWidth: 1,
    flexDirection: "column",
  },
  image: {
    width: SCREEN_WIDTH / 2 - 25,
    height: SCREEN_WIDTH / 2 - 65,
    borderTopStartRadius: borderRadius["2.5"],
    borderTopEndRadius: borderRadius["2.5"],
  },
  content: {
    padding: 12,
    flexDirection: "column",
    gap: 16,
  },
  wrapper: {
    flexDirection: "row",
    gap: SCREEN_HEIGHT >= MEDIUM_DEVICE_HEIGHT ? 6 : 4,
    alignItems: "center",
  },
  description: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: SCREEN_HEIGHT >= MEDIUM_DEVICE_HEIGHT ? 6 : 4,
  },
  originalPrice: {
    textDecorationLine: "line-through",
  },
});

ProductCard.displayName = "ProductCard";
export default ProductCard;
