import React from "react";
import { FlatList, StyleProp, ViewStyle } from "react-native";

// Types & Interfaces
import { Product } from "@/interfaces";

// Components
import { ProductCard } from "@/components/common";

export type ProductPreviewListProps = {
  style?: StyleProp<ViewStyle>;
  data: Product[];
};

const ProductPreviewList = ({ style, data = [] }: ProductPreviewListProps) => {
  return (
    <FlatList
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={style}
      contentContainerStyle={styles.container}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ProductCard {...item} />}
    />
  );
};

const styles = {
  container: {
    gap: 10,
  },
};
export default ProductPreviewList;
