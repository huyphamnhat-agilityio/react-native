import React, { memo } from "react";
import { FlatList, StyleProp, StyleSheet, ViewStyle } from "react-native";

// Components
import BannerItem from "./BannerItem";

// Mocks
import { BANNERS } from "@/mocks";

export type BannerListProps = {
  style?: StyleProp<ViewStyle>;
};

const BannerList = memo(({ style }: BannerListProps) => {
  return (
    <FlatList
      data={BANNERS}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <BannerItem {...item} />}
      style={style}
    />
  );
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    gap: 16,
  },
});

BannerList.displayName = "BannerList";

export default BannerList;
