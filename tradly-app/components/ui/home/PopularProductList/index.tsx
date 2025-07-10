import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

// Components
import ProductPreviewList from "../ProductPreviewList";
import { Button, Text } from "@/components/common";

// Mocks
import { MOCK_PRODUCTS } from "@/mocks/product";

export type PopularProductListProps = {
  style?: StyleProp<ViewStyle>;
};

const PopularProductList = ({ style }: PopularProductListProps) => {
  return (
    <View style={[styles.wrapper, style]}>
      <View style={styles.header}>
        <Text textVariant="quaternary" font="Montserrat_700Bold" size={4.5}>
          Popular Product
        </Text>
        <Button title="See All" rounded={6} style={styles.button} />
      </View>
      <ProductPreviewList data={MOCK_PRODUCTS} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "column",
    gap: 16,
    marginTop: 20,
    paddingHorizontal: 16,
  },

  header: {
    justifyContent: "space-between",
    flexDirection: "row",
  },

  button: {
    paddingHorizontal: 20,
  },
});

export default PopularProductList;
