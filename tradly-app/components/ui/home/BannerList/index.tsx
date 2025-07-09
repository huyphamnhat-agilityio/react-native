import React from "react";
import { FlatList, StyleProp, StyleSheet, ViewStyle } from "react-native";

// Components
import BannerItem from "./BannerItem";

// Mocks
import { BANNERS } from "@/mocks";

export type BannerListProps = {
  style?: StyleProp<ViewStyle>;
};
const BannerList = ({ style }: BannerListProps) => {
  return (
    <FlatList
      data={BANNERS}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => <BannerItem {...item} />}
      style={style}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    gap: 16,
  },
});

export default BannerList;
