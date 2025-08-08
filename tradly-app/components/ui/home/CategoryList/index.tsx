import { StyleProp, ViewStyle } from "react-native";

import { memo, useCallback } from "react";

// Mocks
import { CATEGORIES } from "@/mocks";

// Components
import CategoryItem from "./CategoryItem";

// Interfaces
import { Category } from "@/interfaces";
import Animated, { FadeIn } from "react-native-reanimated";

export type CategoryListProps = {
  style?: StyleProp<ViewStyle>;
};

const CategoryList = memo(({ style }: CategoryListProps) => {
  const handlerRenderItem = useCallback(
    ({ item }: { item: Category }) => <CategoryItem {...item} />,
    [],
  );

  const entering = FadeIn;

  return (
    <Animated.FlatList
      entering={entering}
      data={CATEGORIES.slice(1)}
      scrollEnabled={false}
      numColumns={4}
      renderItem={handlerRenderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      columnWrapperStyle={styles.wrapper}
      style={style}
    />
  );
});

const styles = {
  container: {
    gap: 1,
  },
  wrapper: {
    gap: 1,
  },
};

CategoryList.displayName = "CategoryList";
export default CategoryList;
