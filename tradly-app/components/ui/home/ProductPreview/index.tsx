import React, { memo, useCallback } from "react";
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

// Components
import { Button, ProductPreviewList, Text } from "@/components/common";

// Types & Interfaces
import { Product } from "@/interfaces";

// Constants
import { fadeInLeft400, fadeInRight400, SCREEN_WIDTH } from "@/constants";
import { useRouter } from "expo-router";
import Animated from "react-native-reanimated";

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
          <View style={styles.loadingWrapper}>
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
    height: SCREEN_WIDTH / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    paddingHorizontal: 20,
  },
});

ProductPreview.displayName = "ProductPreview";
export default ProductPreview;
