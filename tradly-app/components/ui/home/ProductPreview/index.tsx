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
import { SCREEN_WIDTH } from "@/constants";
import { useRouter } from "expo-router";

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
          <Text textVariant="quaternary" font="Montserrat_700Bold" size={4.5}>
            {title}
          </Text>
          <Button
            title="See All"
            rounded={6}
            style={styles.button}
            onPress={handleNavigateToBrowse}
          />
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
    height: SCREEN_WIDTH / 2 - 65,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    paddingHorizontal: 20,
  },
});

ProductPreview.displayName = "ProductPreview";
export default ProductPreview;
