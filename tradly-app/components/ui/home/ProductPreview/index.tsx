import React, { memo, useCallback } from "react";
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { useRouter } from "expo-router";
import Animated from "react-native-reanimated";

// Components
import { Button, ProductPreviewList, Text } from "@/components/common";

// Types & Interfaces
import { Product } from "@/interfaces";

// Constants
import { fadeInLeft400, fadeInRight400 } from "@/constants";

// Hooks
import { useScreenDimensions } from "@/store";

export type NewProductListProps = {
  style?: StyleProp<ViewStyle>;
  title: string;
  data: Product[];
  errorMessage?: string;
  isLoading?: boolean;
};

const ProductPreview = memo(
  ({
    style,
    title,
    data = [],
    errorMessage,
    isLoading,
  }: NewProductListProps) => {
    const { navigate } = useRouter();

    const { screenWidth } = useScreenDimensions();

    const handleNavigateToBrowse = useCallback(
      () => navigate("/(main_tabs)/browse"),
      [navigate],
    );

    return (
      <View style={[styles.wrapper, style]}>
        <View style={styles.header}>
          <Animated.View entering={fadeInLeft400}>
            <Text textVariant="quaternary" font="Montserrat_700Bold" size={4.5}>
              {title}
            </Text>
          </Animated.View>
          <Animated.View entering={fadeInRight400}>
            <Button
              title="See All"
              rounded={6}
              style={styles.button}
              onPress={handleNavigateToBrowse}
            />
          </Animated.View>
        </View>

        {isLoading ? (
          <View
            style={[
              styles.loadingWrapper,
              {
                height: screenWidth / 2,
              },
            ]}
          >
            <ActivityIndicator size="large" color="primary" />
          </View>
        ) : (
          <ProductPreviewList data={data} errorMessage={errorMessage} />
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "column",
    gap: 16,
    paddingHorizontal: 16,
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  loadingWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    paddingHorizontal: 20,
  },
});

ProductPreview.displayName = "ProductPreview";
export default ProductPreview;
