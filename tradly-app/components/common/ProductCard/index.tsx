import { Image } from "expo-image";
import { memo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Link } from "expo-router";

// Components
import Text from "../Text";

// Themes
import { background, border, borderRadius } from "@/themes";

// Constants
import { MEDIUM_DEVICE_HEIGHT, TABLET_DEVICE_WIDTH } from "@/constants";

// Interfaces
import { Product } from "@/interfaces";

// Icons
import { TradlyIcon } from "@/components/icons";

// Utils
import { formatNumberWithThousandSeparator } from "@/utils";

// Hooks
import { useScreenDimensions } from "@/store";

const ProductCard = memo(({ id, name, imageUrl, price }: Product) => {
  const { screenWidth, screenHeight } = useScreenDimensions();
  return (
    <Animated.View entering={FadeInDown} key={id}>
      <Link
        href={{ pathname: "/(main_stacks)/product/[id]", params: { id } }}
        asChild
      >
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            ...styles.container,
            width: screenWidth / 2 - 25,
          }}
        >
          <Image
            source={{
              uri: imageUrl,
            }}
            style={[
              styles.image,
              {
                width: screenWidth / 2 - 26,
                height: screenWidth / 2 - 65,
              },
            ]}
            cachePolicy="memory-disk"
            transition={{
              duration: 400,
              effect: "cross-dissolve",
              timing: "ease-in",
            }}
          />
          <View style={styles.content}>
            <Text
              size={screenWidth >= TABLET_DEVICE_WIDTH ? 5 : 3.5}
              numberOfLines={1}
              textVariant="quaternary"
            >
              {name}
            </Text>
            <View style={styles.description}>
              <View style={styles.wrapper}>
                <TradlyIcon />
                <Text
                  textVariant="secondary"
                  size={screenWidth >= TABLET_DEVICE_WIDTH ? 4.5 : 3.5}
                >
                  Tradly
                </Text>
              </View>
              <View
                style={[
                  styles.priceWrapper,
                  {
                    gap: screenHeight >= MEDIUM_DEVICE_HEIGHT ? 6 : 4,
                  },
                ]}
              >
                <Text
                  numberOfLines={1}
                  size={screenWidth >= TABLET_DEVICE_WIDTH ? 4.5 : 3.5}
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
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: background.white,
    borderRadius: borderRadius["2.5"],
    borderColor: border.black_opacity_10,
    borderWidth: 1,
    flexDirection: "column",
  },
  image: {
    borderTopLeftRadius: borderRadius["2.5"],
    borderTopRightRadius: borderRadius["2.5"],
  },
  content: {
    padding: 12,
    flexDirection: "column",
    gap: 16,
  },
  wrapper: {
    flexDirection: "row",
    gap: 2,
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
  },
  originalPrice: {
    textDecorationLine: "line-through",
  },
});

ProductCard.displayName = "ProductCard";
export default ProductCard;
