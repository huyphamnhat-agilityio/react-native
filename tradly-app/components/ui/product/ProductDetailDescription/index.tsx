import { memo } from "react";
import { StyleSheet, View } from "react-native";

// Components
import { Text } from "@/components/common";

// Constants
import {
  fadeInLeft400,
  fadeInRight400,
  fadeInUp400,
  SCREEN_HEIGHT,
} from "@/constants";

// Themes
import { background } from "@/themes";
import Animated, { FadeIn } from "react-native-reanimated";

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
            size={3.5}
          >
            {description}
          </Text>
        </Animated.ScrollView>

        <View style={styles.detailRow}>
          <Animated.View entering={fadeInLeft400} style={styles.detailLabel}>
            <Text textVariant="tertiary">Condition</Text>
            <Text textVariant="tertiary">Price Type</Text>
            <Text textVariant="tertiary">Category</Text>
            <Text textVariant="tertiary">Location</Text>
          </Animated.View>
          <Animated.View entering={fadeInRight400} style={styles.detailValue}>
            <Text textVariant="quaternary">{condition}</Text>
            <Text textVariant="quaternary">{priceType}</Text>
            <Text textVariant="quaternary">{category}</Text>
            <Text textVariant="quaternary">{location}</Text>
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
    flexWrap: "wrap",
  },
});

ProductDetailDescription.displayName = "ProductDetailDescription";
export default ProductDetailDescription;
