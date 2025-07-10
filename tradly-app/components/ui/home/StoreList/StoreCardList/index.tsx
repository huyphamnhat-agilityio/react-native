import React from "react";
import { FlatList, StyleProp, ViewStyle } from "react-native";

// Types & Interfaces
import { Store } from "@/interfaces";

// Components
import StoreCard from "../StoreCard";

export type StoreCardListProps = {
  style?: StyleProp<ViewStyle>;
  data: Store[];
};

const StoreCardList = ({ data, style }: StoreCardListProps) => {
  return (
    <FlatList
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={style}
      contentContainerStyle={styles.container}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <StoreCard {...item} />}
    />
  );
};

const styles = {
  container: {
    gap: 10,
  },
};

export default StoreCardList;
