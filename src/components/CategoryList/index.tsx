import {memo, useCallback} from 'react';
import {FlatList, ListRenderItemInfo, StyleSheet} from 'react-native';

// Components
import CategoryItem from '../CategoryItem';

// Constants
import {CATEGORIES} from 'src/constants';

// Types & Intefaces
import {Category} from 'src/interfaces';

export interface CategoryListProps {
  category?: string;
  setCategory: (category: string) => void;
}
const CategoryList = memo(({category, setCategory}: CategoryListProps) => {
  const handleRenderItem = useCallback(
    ({item: {title, icon}}: ListRenderItemInfo<Category>) => {
      return (
        <CategoryItem
          isActive={category === title}
          onPress={setCategory}
          Icon={icon}
          title={title}
        />
      );
    },
    [category, setCategory],
  );

  const handleGetItemLayout = useCallback(
    (_: ArrayLike<Category> | null | undefined, index: number) => ({
      length: 80,
      offset: 80 * index,
      index,
    }),
    [],
  );

  return (
    <FlatList
      style={styles.container}
      data={CATEGORIES}
      horizontal
      contentContainerStyle={styles.contentContainer}
      renderItem={handleRenderItem}
      extraData={category}
      getItemLayout={handleGetItemLayout}
    />
  );
});

const styles = StyleSheet.create({
  container: {
    height: 80,
    marginTop: 20,
    flexGrow: 0,
  },
  contentContainer: {
    gap: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

CategoryList.displayName = 'CategoryList';

export default CategoryList;
