import React, { memo, useCallback } from "react";
import { FlatList, StyleProp, StyleSheet, ViewStyle } from "react-native";

// Types & Interfaces
import { Product } from "@/interfaces";

// Components
import Text from "../Text";
import ProductCard from "../ProductCard";

export type ProductPreviewListProps = {
  style?: StyleProp<ViewStyle>;
  data: Product[];
  errorMessage?: string;
};

const ProductPreviewList = memo(
  ({ style, data = [], errorMessage }: ProductPreviewListProps) => {
    const handleRenderItem = useCallback(
      ({ item }: { item: Product }) => <ProductCard {...item} />,
      [],
    );
    return (
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={style}
        contentContainerStyle={styles.container}
        keyExtractor={(item) => item.id}
        renderItem={handleRenderItem}
        ListEmptyComponent={
          <Text
            font="Montserrat_600SemiBold"
            textVariant="secondary"
            size={4}
            style={styles.message}
          >
            {errorMessage}
          </Text>
        }
      />
    );
  },
);

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  message: {
    textAlign: "center",
  },
});

ProductPreviewList.displayName = "ProductPreviewList";
export default ProductPreviewList;
