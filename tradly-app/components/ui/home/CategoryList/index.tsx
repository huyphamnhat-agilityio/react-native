import { FlatList, StyleProp, ViewStyle } from "react-native";

// Mocks
import { CATEGORIES } from "@/mocks";

// Components
import CategoryItem from "./CategoryItem";
import { memo } from "react";

export type CategoryListProps = {
  style?: StyleProp<ViewStyle>;
};

const CategoryList = memo(({ style }: CategoryListProps) => {
  return (
    <FlatList
      data={CATEGORIES}
      scrollEnabled={false}
      numColumns={4}
      renderItem={({ item }) => <CategoryItem {...item} />}
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
