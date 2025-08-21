import { memo } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

// Components
import { Text } from "@/components/common";

// Constants
import {
  fadeInLeft400,
  fadeInRight400,
  fadeInUp400,
  SCREEN_HEIGHT,
  TABLET_DEVICE_WIDTH,
} from "@/constants";

// Themes
import { background } from "@/themes";

// Store
import { useScreenDimensions } from "@/store";

export type ProductDetailDescriptionProps = {
  description: string;
  condition: string;
  priceType: string;
  category: string;
  location: string;
};
const ProductDetailDescription = memo(
  ({
    description,
    condition,
    priceType,
    category,
    location,
  }: ProductDetailDescriptionProps) => {
    const { screenWidth } = useScreenDimensions();

    return (
      <Animated.View entering={FadeIn} style={styles.contentWrapper}>
        <Animated.ScrollView
          entering={fadeInUp400}
          style={styles.descriptionWrapper}
          nestedScrollEnabled
        >
          <Text
            font="Montserrat_400Regular"
            textVariant="quaternary"
            size={screenWidth >= TABLET_DEVICE_WIDTH ? 4.5 : 3.5}
          >
            {description}
          </Text>
        </Animated.ScrollView>

        <View style={styles.detailRow}>
          <Animated.View entering={fadeInLeft400} style={styles.detailLabel}>
            <Text
              size={screenWidth >= TABLET_DEVICE_WIDTH ? 4 : 3}
              textVariant="tertiary"
            >
              Condition
            </Text>
            <Text
              size={screenWidth >= TABLET_DEVICE_WIDTH ? 4 : 3}
              textVariant="tertiary"
            >
              Price Type
            </Text>
            <Text
              size={screenWidth >= TABLET_DEVICE_WIDTH ? 4 : 3}
              textVariant="tertiary"
            >
              Category
            </Text>
            <Text
              size={screenWidth >= TABLET_DEVICE_WIDTH ? 4 : 3}
              textVariant="tertiary"
            >
              Location
            </Text>
          </Animated.View>
          <Animated.View entering={fadeInRight400} style={styles.detailValue}>
            <Text
              size={screenWidth >= TABLET_DEVICE_WIDTH ? 4 : 3}
              textVariant="quaternary"
            >
              {condition}
            </Text>
            <Text
              size={screenWidth >= TABLET_DEVICE_WIDTH ? 4 : 3}
              textVariant="quaternary"
            >
              {priceType}
            </Text>
            <Text
              size={screenWidth >= TABLET_DEVICE_WIDTH ? 4 : 3}
              textVariant="quaternary"
            >
              {category}
            </Text>
            <Text
              size={screenWidth >= TABLET_DEVICE_WIDTH ? 4 : 3}
              textVariant="quaternary"
            >
              {location}
            </Text>
          </Animated.View>
        </View>
      </Animated.View>
    );
  },
);

const styles = StyleSheet.create({
  contentWrapper: {
    marginTop: 6,
    padding: 30,
    backgroundColor: background.white,
    gap: 40,
  },
  descriptionWrapper: {
    maxHeight: SCREEN_HEIGHT * 0.15,
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
  },
});

ProductDetailDescription.displayName = "ProductDetailDescription";
export default ProductDetailDescription;
