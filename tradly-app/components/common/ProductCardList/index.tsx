import React from "react";
import { FlatList, StyleProp, StyleSheet, ViewStyle } from "react-native";

// Types & Interfaces
import { Product } from "@/interfaces";

// Components
import ProductCard from "../ProductCard";

export type ProductPreviewListProps = {
  style?: StyleProp<ViewStyle>;
  data: Product[];
};

const ProductList = ({ style, data }: ProductPreviewListProps) => {
  return (
    <FlatList
      data={data}
      numColumns={2}
      style={style}
      contentContainerStyle={styles.container}
      columnWrapperStyle={styles.wrapper}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ProductCard {...item} />}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  wrapper: {
    gap: 10,
  },
});
export default ProductList;
